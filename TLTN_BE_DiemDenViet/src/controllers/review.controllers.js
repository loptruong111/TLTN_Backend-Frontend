import Review from "../models/review.models.js";
import CommonUtil from "../utils/CommonUtil.js";

class ReviewController {
  static async post(req, res, next) {
    try {
      const { rating, comment, userId, destinationId } = req.body;
      const review = new Review({ rating, comment, userId, destinationId });
      const newReview = await review.save();
      return res.success("Đánh giá đã được tạo thành công", newReview);
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
      const [data, total, lastMonth] = await Promise.all([
        Review.find(query)
          .sort({ updateAt: sortDirection })
          .skip(skip)
          .limit(pageSize),
        Review.find(query).countDocuments(),
        Review.countDocuments({
          createdAt: { $gte: CommonUtil.oneMonthAgo() },
        }),
      ]);
      return res.success("Lấy danh sách đánh giá thành công", {
        total: total,
        countRes: data.length,
        data,
        lastMonth,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getForDestination(req, res, next) {
    try {
      const { id, destinationId, userId } = req.query;
      const sortDirection = parseInt(req.query.order) || -1;
      const startIndex = parseInt(req.query.startIndex) || 0;
      const limit = parseInt(req.query.limit) || null;

      const query = {
        ...(id && { _id: id }),
        ...(destinationId && { destinationId: destinationId }),
        ...(userId && { userId: userId }),
      };

      const [data, total] = await Promise.all([
        Review.find(query)
          .sort({ createdAt: sortDirection })
          .skip(startIndex)
          .limit(limit)
          .populate("userId", "name avatar"),
        Review.find(query).countDocuments(),
      ]);
      return res.success("Lấy danh sách đánh giá thành công", {
        total: total,
        countRes: data.length,
        data,
      });
    } catch (error) {
      next(error);
    }
  }
  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const deletedReview = await Review.findByIdAndUpdate(id, {
        isDeleted: true,
      });
      console.log(deletedReview);
      if (!deletedReview) {
        return res.error(404, "Không tìm thấy đánh giá");
      }
      return res.success("Đánh giá đã bị xóa");
    } catch (error) {
      next(error);
    }
  }
}

export default ReviewController;
