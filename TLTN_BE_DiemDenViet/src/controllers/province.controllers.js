import Province from "../models/province.models.js";

class ProvinceController {
  static async post(req, res, next) {
    try {
      const { name } = req.body;

      const province = await Province.findOne({ name: name });
      if (province) {
        return res.error(400, "Tỉnh đã tồn tại");
      }

      const newProvince = new Province({ name });
      const savedProvince = await newProvince.save();

      return res.success("Tỉnh đã được tạo thành công", savedProvince);
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const { isDeleted } = req.query;
      const sortDirection = parseInt(req.query.order) || 1;
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 20;
      const skip = (page - 1) * pageSize;

      const query = {
        ...(isDeleted !== undefined && { isDeleted: isDeleted === "true" }),
      };

      const [data, total] = await Promise.all([
        Province.aggregate([
          { $match: query },
          {
            $lookup: {
              from: "districts",
              localField: "_id",
              foreignField: "provinceId",
              as: "districts",
            },
          },
          {
            $lookup: {
              from: "destinations",
              localField: "_id",
              foreignField: "address.provinceId",
              as: "destinations",
            },
          },
          {
            $project: {
              _id: 1,
              name: 1,
              isDeleted: 1,
              districtCount: { $size: "$districts" },
              destinationCount: { $size: "$destinations" },
            },
          },
          { $sort: { name: sortDirection } },
          { $skip: skip },
          { $limit: pageSize },
        ]),
        Province.aggregate([{ $match: query }, { $count: "total" }]),
      ]);

      return res.success("Lấy danh sách tỉnh thành công", {
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
      const province = await Province.findById(id);
      if (!province) {
        return res.error(404, "Không tìm thấy tỉnh");
      }
      return res.success("Lấy tỉnh thành công", province);
    } catch (error) {
      next(error);
    }
  }

  static async put(req, res, next) {
    try {
      const { id } = req.params;
      const { name, regionId, isDeleted } = req.body;
      const updatedProvince = await Province.findByIdAndUpdate(
        id,
        {
          name,
          regionId,
          isDeleted,
        },
        { new: true }
      );
      if (!updatedProvince) {
        return res.error(404, "Không tìm thấy tỉnh");
      }
      return res.success("Tỉnh đã được cập nhật", updatedProvince);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const deletedProvince = await Province.findByIdAndUpdate(id, {
        isDeleted: true,
      });
      if (!deletedProvince) return res.error(404, "Không tìm thấy tỉnh");
      return res.success("Tỉnh đã bị xóa");
    } catch (error) {
      next(error);
    }
  }

  static async getForSelect(req, res, next) {
    try {
      const data = await Province.find({ isDeleted: false }, "name");
      return res.success("Lấy danh sách tỉnh thành công", {
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default ProvinceController;
