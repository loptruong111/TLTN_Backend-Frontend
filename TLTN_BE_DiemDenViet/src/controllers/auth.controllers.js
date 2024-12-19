import User from "../models/user.models.js";
import envVar from "../utils/envVariable.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

class AuthController {
  static async signup(req, res, next) {
    try {
      const { name, username, password } = req.body;

      const user = await User.findOne({ username: username });
      if (user) {
        return res.error(404, "Tên đăng nhập đã tồn tại", {
          field: "username",
          message: "Tên đăng nhập đã tồn tại",
        });
      }
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);

      const newUser = new User({
        name,
        username,
        password: hashedPassword,
      });
      const savedUser = await newUser.save();

      const token = jwt.sign(
        { id: savedUser._id, isAdmin: savedUser.isAdmin },
        envVar.jwtSecret,
        { expiresIn: "6h" }
      );
      const { password: pass, ...rest } = savedUser._doc;
      return res
        .cookie("access_token", token, {
          expiresIn: "6h",
          httpOnly: true, // Bảo mật cookie, không truy cập được từ JS
          secure: true, // Cookie chỉ được gửi qua HTTPS
          sameSite: "none", // Đảm bảo cookie hoạt động trên các domain khác nhau
        })
        .success("Đăng ký thành công", rest);
    } catch (error) {
      next(error);
    }
  }

  static async signin(req, res, next) {
    try {
      const { username, password } = req.body;

      const validUser = await User.findOne({ username: username });
      if (!validUser) {
        return res.error(404, "Tên đăng nhập không tồn tại", {
          field: "username",
          message: "Tên đăng nhập không tồn tại",
        });
      }
      const isMatch = await bcryptjs.compare(password, validUser.password);
      if (!isMatch) {
        return res.error(401, "Mật khẩu không chính xác");
      }
      const token = jwt.sign(
        { id: validUser._id, isAdmin: validUser.isAdmin },
        envVar.jwtSecret,
        { expiresIn: "6h" }
      );
      const { password: pass, ...rest } = validUser._doc;
      return res
        .cookie("access_token", token, {
          expiresIn: "6h",
          httpOnly: true, // Bảo mật cookie, không truy cập được từ JS
          secure: true, // Cookie chỉ được gửi qua HTTPS
          sameSite: "none", // Đảm bảo cookie hoạt động trên các domain khác nhau
        })
        .success("Đăng nhập thành công", rest);
    } catch (error) {
      next(error);
    }
  }

  static async signout(req, res, next) {
    try {
      return res.clearCookie("access_token", {
        httpOnly: true,
        secure: true,   
        sameSite: "none" 
      }).success("Đăng xuất thành công");
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
