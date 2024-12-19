import mongoose, { Schema } from "mongoose";

const DestinationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/vietnam-map-touristic-isometric-poster_1284-17336.jpg",
      required: true,
    },
    description: { type: String, default: "Đang cập nhật", required: true },
    address: {
      street: { type: String }, // Đảm bảo `street` có giá trị
      wardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ward",
      },
      districtId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "District",
      },
      provinceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Province",
      },
    },
    openingTime: [
      {
        day: { type: String, required: true },
        open: { type: Boolean, default: false },
        openAllDay: { type: Boolean, default: false },
        closedAllDay: { type: Boolean, default: false },
        startTime: { type: String }, // Thêm định dạng giờ nếu cần (ví dụ: HH:MM)
        endTime: { type: String },
      },
    ],
    ticketPrice: { type: String, default: "Đang cập nhật" },
    views: { type: Number, default: 0, min: 0 },
    category: {
      categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
      subcategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subcategory",
        required: true,
      },
    },
    averageRating: { type: Number, default: 5 },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, minimize: false, strict: true }
);

DestinationSchema.index({ "address.wardId": 1 });
DestinationSchema.index({ "address.districtId": 1 });
DestinationSchema.index({ "address.provinceId": 1 });
DestinationSchema.index({ "category.categoryId": 1 });
DestinationSchema.index({ "category.subcategoryId": 1 });
DestinationSchema.index({ "address.averageRating": 1 });
DestinationSchema.index({ isDeleted: 1 });

// Middleware kiểm tra tính logic của `openingTime`
DestinationSchema.pre("save", function (next) {
  this.openingTime.forEach((time) => {
    if (time.openAllDay && time.closedAllDay) {
      return next(
        new Error("`openAllDay` và `closedAllDay` không thể cùng là true.")
      );
    }
  });
  next();
});

const Destination = mongoose.model("Destination", DestinationSchema);
export default Destination;
