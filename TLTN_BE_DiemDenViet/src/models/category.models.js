import mongoose from "mongoose";

const CategorySchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, minimize: false, strict: true }
);

CategorySchema.index({ isDeleted: 1 });

const Category = mongoose.model("Category", CategorySchema);
export default Category;
