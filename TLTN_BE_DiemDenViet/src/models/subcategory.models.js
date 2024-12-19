import mongoose from "mongoose";

const SubcategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);
SubcategorySchema.index({ isDeleted: 1 });
SubcategorySchema.index({ provinceId: 1 });

const Subcategory = mongoose.model("Subcategory", SubcategorySchema);
export default Subcategory;
