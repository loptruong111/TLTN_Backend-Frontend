import mongoose from "mongoose";

const ProvinceSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, minimize: false, strict: true }
);

ProvinceSchema.index({ isDeleted: 1 });

const Province = mongoose.model("Province", ProvinceSchema);
export default Province;
