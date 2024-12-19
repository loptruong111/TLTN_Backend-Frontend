import mongoose from "mongoose";

const TripSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    selection: {
      location: { type: String, required: true },
      noOfDay: { type: Number, required: true, min: 1, max: 5 },
      traveler: { type: String, required: true },
      budget: { type: String, required: true },
    },
    data: { type: Object },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, minimize: false, strict: true }
);

TripSchema.index({ userId: 1 });
TripSchema.index({ isDeleted: 1 });

const Trip = mongoose.model("Trip", TripSchema);
export default Trip;
