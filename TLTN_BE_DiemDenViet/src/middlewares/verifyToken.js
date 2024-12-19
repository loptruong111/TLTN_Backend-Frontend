import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/errorHandler.js";

class AuthMiddleware {
  static verifyAdmin(req, res, next) {
    try {
      const token = req.cookies.access_token;
      if (!token) {
        return res.error(401, "Không có quyền truy cập");
      }
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          return res.error(401, "Không có quyền truy cập");
        }
        req.user = user;
        if (user.isAdmin) {
          return next();
        } else {
          return res.error(403, "Yêu cầu quyền quản trị viên");
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static verifyUser(req, res, next) {
    try {
      const token = req.cookies.access_token;
      if (!token) {
        return res.error(401, "Không có quyền truy cập");
      }
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          return res.error(401, "Không có quyền truy cập");
        }
        return next();
      });
    } catch (error) {
      next(error);
    }
  }

  static verifyThisUserOrAdmin(req, res, next) {
    try {
      const token = req.cookies.access_token;
      if (!token) {
        return res.error(401, "Không có quyền truy cập");
      }
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          return res.error(401, "Không có quyền truy cập");
        }
        req.user = user;
        if (user.isAdmin || user.id === req.body.userId) {
          return next();
        }
        return res.error(401, "Yêu cầu bị từ chối");
      });
    } catch (error) {
      next(error);
    }
  }
}

export default AuthMiddleware;
