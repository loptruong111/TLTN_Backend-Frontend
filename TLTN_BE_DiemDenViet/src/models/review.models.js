import mongoose from "mongoose";
import Destination from "./destination.models.js";

const ReviewSchema = mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      default: 5,
    },
    comment: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    destinationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
      required: true,
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, minimize: false, strict: true }
);

ReviewSchema.index({ isDeleted: 1 });
ReviewSchema.index({ destinationId: 1 });

// Middleware pre-save: kiểm tra sự tồn tại của userId và destinationId trước khi lưu
ReviewSchema.pre("save", function (next) {
  const review = this;

  // Tìm cả Province và DestinationType theo Id
  Promise.all([
    mongoose.model("User").findById(review.userId),
    mongoose.model("Destination").findById(review.destinationId),
  ])
    .then(([user, destination]) => {
      if (!user) {
        // Nếu User không tồn tại, ngăn lưu review
        return next(new Error("User id not found"));
      }
      if (!destination) {
        // Nếu Destination không tồn tại, ngăn lưu review
        return next(new Error("Destination id not found"));
      }
      // Nếu cả user và destinationw đều tồn tại, tiếp tục lưu
      next();
    })
    .catch((err) => next(err));
});

ReviewSchema.post("save", async function () {
  await updateAverageRating(this.destinationId);
});

ReviewSchema.post("findOneAndUpdate", async function (doc) {
  if (doc) await updateAverageRating(doc.destinationId);
});

ReviewSchema.post("findOneAndDelete", async function (doc) {
  if (doc) await updateAverageRating(doc.destinationId);
});

async function updateAverageRating(destinationId) {
  const result = await Review.aggregate([
    { $match: { destinationId: destinationId } },
    { $group: { _id: "$destinationId", averageRating: { $avg: "$rating" } } },
  ]);

  const averageRating = result[0] ? result[0].averageRating : 0;
  await Destination.findByIdAndUpdate(destinationId, { averageRating });
}

const Review = mongoose.model("Review", ReviewSchema);
export default Review;
