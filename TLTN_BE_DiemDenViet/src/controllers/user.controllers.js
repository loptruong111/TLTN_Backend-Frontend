import User from "../models/user.models.js";
import envVar from "../utils/envVariable.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import CommonUtil from "../utils/CommonUtil.js";

class UserController {
  static async getByToken(req, res, next) {
    try {
      const token = req.cookies.access_token;
      if (!token) {
        return res.error(401, "Không có token.");
      }
      const decoded = jwt.verify(token, envVar.jwtSecret);
      const userId = decoded.id;

      const user = await User.findById(userId);
      const { password: pass, ...rest } = user._doc;
      if (user) {
        return res.success("Lấy thông tin người dùng thành công", rest);
      } else {
        return res.error(404, "Không tìm thấy người dùng.");
      }
    } catch (error) {
      next(error);
    }
  }

  static async put(req, res, next) {
    try {
      const { avatar, name, username, password } = req.body;
      const userId = req.params.id;
      const user = await User.findById(userId);
      if (!user) {
        return res.error(404, "Không tìm thấy người dùng.");
      }
      if (avatar !== undefined && avatar !== "") user.avatar = avatar;
      if (name !== undefined && name !== "") user.name = name;
      if (username !== undefined && username !== "") user.username = username;
      if (password !== undefined && password !== "") {
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        user.password = hashedPassword;
      }
      await user.save();
      const { password: pass, ...rest } = user._doc;
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        envVar.jwtSecret,
        { expiresIn: "6h" }
      );
      return res
        .cookie("access_token", token, {
          expiresIn: "6h",
          httpOnly: true,
          secure: true,
          sameSite: "none",
        })
        .success("Cập nhật người dùng thành công", rest);
    } catch (error) {
      next(error);
    }
  }

  static async putByAdmin(req, res, next) {
    try {
      const { isAdmin, isDeleted } = req.body;
      const userId = req.params.id;
      const updatedFields = {
        ...(isAdmin && { isAdmin }),
        ...(isDeleted && { isDeleted }),
      };

      const updatetedUser = await User.findByIdAndUpdate(
        userId,
        updatedFields,
        { new: true, select: "-password" }
      );
      if (!updatetedUser) {
        return res.error(404, "Không tìm thấy người dùng.");
      }
      const { password: pass, ...rest } = updatetedUser._doc;

      return res.success("Cập nhật người dùng thành công", rest);
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const { username, isAdmin, isDeleted } = req.query;
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 20;
      const skip = (page - 1) * pageSize;

      const query = {
        ...(isDeleted && { isDeleted: isDeleted == "true" }),
        ...(isAdmin && { isAdmin: isAdmin == "true" }),
        ...(username && {
          $or: [{ username: { $regex: username, $options: "i" } }],
        }),
      };

      const [data, total, lastMonth] = await Promise.all([
        User.find(query).skip(skip).limit(pageSize),
        User.find(query).countDocuments(),
        User.countDocuments({
          createdAt: { $gte: CommonUtil.oneMonthAgo() },
        }),
      ]);

      return res.success("Lấy danh sách chuyến đi thành công", {
        total,
        countRes: data.length,
        data,
        lastMonth,
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const deletedUer = await User.findByIdAndUpdate(id, {
        isDeleted: true,
      });
      if (!deletedUer) return res.error(404, "Không tìm thấy tài khoản");
      return res.success("Tài khoản đã bị xóa");
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
