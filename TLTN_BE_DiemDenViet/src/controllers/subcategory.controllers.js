import mongoose from "mongoose";
import Category from "../models/category.models.js";
import Subcategory from "../models/subcategory.models.js";

class SubcategoryController {
  static async post(req, res, next) {
    try {
      const { name, categoryId } = req.body;
      const category = await Category.findById(categoryId);
      if (!category) return res.error(400, "Không tìm thấy categoryId");

      const subcategory = await Subcategory.findOne({
        name,
        categoryId,
      });
      if (subcategory) {
        return res.error(400, "Danh mục con đã tồn tại");
      }
      const newSubcategory = new Subcategory({ name, categoryId });
      const savedSubcategory = await newSubcategory.save();
      return res.success(
        "Danh mục con đã được tạo thành công",
        savedSubcategory
      );
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const { isDeleted, categoryId } = req.query;
      const sortDirection = parseInt(req.query.order) || 1;
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 20;
      const skip = (page - 1) * pageSize;

      const query = {
        ...(isDeleted !== undefined && { isDeleted: isDeleted === "true" }),
        ...(categoryId && {
          categoryId: new mongoose.Types.ObjectId(categoryId),
        }),
      };

      const [data, total] = await Promise.all([
        Subcategory.aggregate([
          { $match: query },
          {
            $lookup: {
              from: "categories",
              localField: "categoryId",
              foreignField: "_id",
              as: "category",
            },
          },
          {
            $lookup: {
              from: "destinations",
              localField: "_id",
              foreignField: "category.subcategoryId",
              as: "destinations",
            },
          },
          {
            $project: {
              _id: 1,
              name: 1,
              isDeleted: 1,
              category: {
                $arrayElemAt: ["$category", 0],
              },
              destinationCount: { $size: "$destinations" },
            },
          },
          { $sort: { name: sortDirection } },
          { $skip: skip },
          { $limit: pageSize },
        ]),
        Subcategory.aggregate([{ $match: query }, { $count: "total" }]),
      ]);
      return res.success("Lấy danh sách danh mục con thành công", {
        total: total[0].total,
        countRes: data.length,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async get(req, res, next) {
    try {
      const { id } = req.params;
      const subcategory = await Subcategory.findById(id);
      if (!subcategory) {
        return res.error(404, "Không tìm thấy danh mục con");
      }
      return res.success("Lấy thông tin danh mục con thành công", subcategory);
    } catch (error) {
      next(error);
    }
  }

  static async put(req, res, next) {
    try {
      const { id } = req.params;
      const { name, isDeleted, categoryId } = req.body;
      const updatedSubcategory = await Subcategory.findByIdAndUpdate(
        id,
        {
          name: name,
          isDeleted: isDeleted,
          categoryId: categoryId,
        },
        { new: true }
      );
      if (!updatedSubcategory) {
        return res.error(404, "Không tìm thấy danh mục con");
      }
      return res.success(
        "Danh mục con đã được cập nhật thành công",
        updatedSubcategory
      );
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const deletedSubcategory = await Subcategory.findByIdAndUpdate(id, {
        isDeleted: true,
      });
      if (!deletedSubcategory) {
        return res.error(404, "Không tìm thấy danh mục con");
      }
      return res.success("Danh mục con đã bị xóa");
    } catch (error) {
      next(error);
    }
  }

  static async getForSelect(req, res, next) {
    try {
      const { categoryId } = req.query;
      const data = await Subcategory.find(
        { isDeleted: false, categoryId: categoryId },
        "name"
      );
      return res.success("Lấy danh sách danh mục con thành công", {
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default SubcategoryController;
