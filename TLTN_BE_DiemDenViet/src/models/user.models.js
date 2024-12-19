import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: {
      type: String,
      required: true,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, minimize: false, strict: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
