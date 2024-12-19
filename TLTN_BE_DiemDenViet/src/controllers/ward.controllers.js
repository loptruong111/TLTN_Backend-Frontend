import mongoose from "mongoose";
import Ward from "../models/ward.models.js";

class WardController {
  static async post(req, res, next) {
    try {
      const { name, districtId } = req.body;

      const ward = await Ward.findOne({ name: name, districtId: districtId });
      if (ward) {
        return res.error(400, "Phường đã tồn tại");
      }

      const newWard = new Ward({ name, districtId });
      const savedWard = await newWard.save();

      return res.success("Thêm phường thành công", savedWard);
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const { isDeleted, districtId, provinceId } = req.query;
      const sortDirection = parseInt(req.query.order) || 1;
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 20;
      const skip = (page - 1) * pageSize;
      const query = {
        ...(isDeleted !== undefined && { isDeleted: isDeleted === "true" }),
        ...(districtId && {
          districtId: new mongoose.Types.ObjectId(districtId),
        }),
      };
      const [data, total] = await Promise.all([
        Ward.aggregate([
          { $match: query },
          {
            $lookup: {
              from: "districts",
              localField: "districtId",
              foreignField: "_id",
              as: "district",
            },
          },
          {
            $unwind: "$district",
          },
          {
            $lookup: {
              from: "provinces",
              localField: "district.provinceId",
              foreignField: "_id",
              as: "province",
            },
          },
          {
            $unwind: "$province",
          },
          {
            $match: {
              ...(provinceId && {
                "province._id": new mongoose.Types.ObjectId(provinceId),
              }),
            },
          },
          {
            $lookup: {
              from: "destinations",
              localField: "_id",
              foreignField: "address.wardId",
              as: "destinations",
            },
          },
          {
            $project: {
              _id: 1,
              name: 1,
              isDeleted: 1,
              district: { _id: "$district._id", name: "$district.name" },
              province: { _id: "$province._id", name: "$province.name" },
              destinationCount: { $size: "$destinations" },
            },
          },
          { $sort: { name: sortDirection } },
          { $skip: skip },
          { $limit: pageSize },
        ]),
        Ward.aggregate([
          { $match: query },
          {
            $lookup: {
              from: "districts",
              localField: "districtId",
              foreignField: "_id",
              as: "district",
            },
          },
          {
            $unwind: "$district",
          },
          {
            $lookup: {
              from: "provinces",
              localField: "district.provinceId",
              foreignField: "_id",
              as: "province",
            },
          },
          {
            $unwind: "$province",
          },
          {
            $match: {
              ...(provinceId && {
                "province._id": new mongoose.Types.ObjectId(provinceId),
              }),
            },
          },
          {
            $lookup: {
              from: "destinations",
              localField: "_id",
              foreignField: "address.wardId",
              as: "destinations",
            },
          },
          { $count: "total" },
        ]),
      ]);

      return res.success("Lấy danh sách phường thành công", {
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
      const ward = await Ward.findById(id);
      if (!ward) {
        return res.error(404, "Không tìm thấy phường");
      }
      return res.success("Lấy thông tin phường thành công", ward);
    } catch (error) {
      next(error);
    }
  }

  static async put(req, res, next) {
    try {
      const { id } = req.params;
      const { name, districtId, isDeleted } = req.body;
      const updatedWard = await Ward.findByIdAndUpdate(
        id,
        {
          name,
          districtId,
          isDeleted,
        },
        { new: true }
      );
      if (!updatedWard) {
        return res.error(404, "Không tìm thấy phường");
      }
      return res.success("Cập nhật phường thành công", updatedWard);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const deletedWard = await Ward.findByIdAndUpdate(id, {
        isDeleted: true,
      });
      if (!deletedWard) return res.error(404, "Không tìm thấy phường.");
      return res.success("Phường đã bị xóa.");
    } catch (error) {
      next(error);
    }
  }

  static async getForSelect(req, res, next) {
    try {
      const { districtId } = req.query;
      const data = await Ward.find(
        { isDeleted: false, districtId: districtId },
        "name"
      );
      return res.success("Lấy danh sách phường thành công", {
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default WardController;
