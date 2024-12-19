import Destination from "../models/destination.models.js";

class DestinationController {
  static async post(req, res, next) {
    try {
      const {
        name,
        image,
        description,
        address,
        openingTime,
        ticketPrice,
        category,
      } = req.body;
      const existingDestination = await Destination.findOne({ name });
      if (existingDestination) {
        return res.error(400, "Tên địa điểm đã tồn tại");
      }
      const newDestination = new Destination({
        name,
        ...(image && { image }),
        ...(description && { description }),
        ...(address && { address }),
        ...(openingTime && { openingTime }),
        ...(ticketPrice && { ticketPrice }),
        category: {
          categoryId: category.categoryId,
          subcategoryId: category.subcategoryId,
        },
      });

      const savedDestionation = await newDestination.save();
      return res.success("Địa điểm đã được tạo thành công", savedDestionation);
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const {
        searchTerm, 
        provinceId,
        districtId,
        wardId,
        categoryId,
        subcategoryId,
        sortBy,
      } = req.query;
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 20;
      const skip = (page - 1) * pageSize;

      const query = {
        ...(provinceId && { "address.provinceId": provinceId }),
        ...(districtId && { "address.districtId": districtId }),
        ...(wardId && { "address.wardId": wardId }),
        ...(categoryId && { "category.categoryId": categoryId }),
        ...(subcategoryId && { "category.subcategoryId": subcategoryId }),
        ...(searchTerm && {
          $or: [
            { name: { $regex: searchTerm, $options: "i" } },
            { description: { $regex: searchTerm, $options: "i" } },
          ],
        }),
      };

      let sortOptions = {};
      if (sortBy === "views") {
        sortOptions = { views: -1 };
      } else if (sortBy === "rating") {
        sortOptions = { averageRating: -1 };
      }
      const [data, total] = await Promise.all([
        Destination.find(query).sort(sortOptions).skip(skip).limit(pageSize),
        Destination.find(query).countDocuments(),
      ]);

      return res.success("Lấy danh sách địa điểm thành công", {
        total,
        countRes: data.length,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async put(req, res, next) {
    try {
      const { id } = req.params;
      const {
        name,
        image,
        description,
        address,
        openingTime,
        ticketPrice,
        category,
        isDeleted,
      } = req.body;
      const newDestination = await Destination.findByIdAndUpdate(
        id,
        {
          ...(name && { name }),
          ...(image && { image }),
          ...(description && { description }),
          ...(address && { address }),
          ...(openingTime && { openingTime }),
          ...(ticketPrice && { ticketPrice }),
          ...(isDeleted && { isDeleted }),
          ...(category && {
            category: {
              categoryId: category.categoryId,
              subcategoryId: category.subcategoryId,
            },
          }),
        },
        { new: true }
      );
      if (!newDestination) {
        return res.error(404, "Không tìm thấy địa điểm");
      }
      return res.success("Địa điểm đã được cập nhật", newDestination);
    } catch (error) {
      next(error);
    }
  }

  static async get(req, res, next) {
    try {
      const { id } = req.params;
      const destination = await Destination.findById(id)
        .populate({ path: "address.wardId", select: "name" })
        .populate({ path: "address.districtId", select: "name" })
        .populate({ path: "address.provinceId", select: "name" })
        .populate({ path: "category.categoryId", select: "name" })
        .populate({ path: "category.subcategoryId", select: "name" });
      if (!destination) {
        return res.error(404, "Không tìm thấy địa điểm");
      }
      destination.views += 1;
      await destination.save();

      return res.success("Lấy địa điểm thành công", destination);
    } catch (error) {
      next(error);
    }
  }

  static async getForUpdate(req, res, next) {
    try {
      const { id } = req.params;
      const destination = await Destination.findById(id);

      if (!destination) {
        return res.error(404, "Không tìm thấy địa điểm");
      }

      return res.success("Lấy địa điểm thành công", destination);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const deletedDistrict = await Destination.findByIdAndUpdate(id, {
        isDeleted: true,
      });
      if (!deletedDistrict) return res.error(404, "Không tìm thấy quận huyện");
      return res.success("Quận huyện đã bị xóa", deletedDistrict);
    } catch (error) {
      next(error);
    }
  }

  static async search(req, res, next) {
    try {
      const {
        searchTerm,
        provinceId,
        districtId,
        wardId,
        categoryId,
        subcategoryId,
        sortBy,
      } = req.query;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 20;
      const skip = (page - 1) * limit;

      const query = {
        isDeleted: false,
        ...(provinceId && { "address.provinceId": provinceId }),
        ...(districtId && { "address.districtId": districtId }),
        ...(wardId && { "address.wardId": wardId }),
        ...(categoryId && { "category.categoryId": categoryId }),
        ...(subcategoryId && { "category.subcategoryId": subcategoryId }),
        ...(searchTerm && {
          $or: [
            { name: { $regex: searchTerm, $options: "i" } },
            { description: { $regex: searchTerm, $options: "i" } },
          ],
        }),
      };

      let sortOptions = {};
      if (sortBy === "views") {
        sortOptions = { views: -1 };
      } else if (sortBy === "rating") {
        sortOptions = { averageRating: -1 };
      }
      const [data, total] = await Promise.all([
        Destination.find(query, "name image ticketPrice views averageRating")
          .sort(sortOptions)
          .skip(skip)
          .limit(limit)
          .populate("address.provinceId", "name")
          .populate("address.districtId", "name"),
        Destination.find(query).countDocuments(),
      ]);

      return res.success("Lấy danh sách địa điểm thành công", {
        total,
        countRes: data.length,
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default DestinationController;
