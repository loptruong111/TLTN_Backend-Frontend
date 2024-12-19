import mongoose from "mongoose";

const WardSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    districtId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "District",
      required: true,
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, minimize: false, strict: true }
);

WardSchema.index({ districtId: 1 });
WardSchema.index({ isDeleted: 1 });

const Ward = mongoose.model("Ward", WardSchema);
export default Ward;
