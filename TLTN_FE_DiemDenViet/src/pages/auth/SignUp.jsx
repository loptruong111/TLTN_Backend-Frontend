import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slice/userSlice";
import AuthService from "../../services/AuthService";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    repeatPassword: "",
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]:
        e.target.id === "name" ? e.target.value : e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.repeatPassword) {
      setLoading(false);
      return setError("Mật khẩu không trùng khớp.");
    }

    try {
      const res = await AuthService.signUp(formData);
      if (!res.status) {
        setError(res.message);
        return;
      }
      dispatch(login(res.data));
      navigate("/");
    } catch (error) {
      setError(error.message || "Có lỗi xảy ra.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="justify-center">
      <h1 className="text-center text-5xl font-bold mt-5">ĐĂNG KÝ</h1>
      <form
        className="flex max-w-md flex-col gap-4 mx-auto my-7"
        onSubmit={handleSubmit}
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Tên" />
          </div>
          <TextInput
            id="name"
            type="text"
            required
            shadow
            onChange={handleChange}
            value={formData.name}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="username" value="Tên đăng nhập" />
          </div>
          <TextInput
            id="username"
            type="text"
            required
            shadow
            onChange={handleChange}
            value={formData.username}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Mật khẩu" />
          </div>
          <div className="relative">
            <TextInput
              id="password"
              type={showPassword ? "text" : "password"}
              required
              shadow
              onChange={handleChange}
              value={formData.password}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            >
              {showPassword ? "Ẩn" : "Hiện"}
            </button>
          </div>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="repeatPassword" value="Xác nhận mật khẩu" />
          </div>
          <TextInput
            id="repeatPassword"
            type="password"
            placeholder="Nhập lại mật khẩu"
            required
            shadow
            onChange={handleChange}
            value={formData.repeatPassword}
          />
        </div>
        {error && <Alert color="failure">{error}</Alert>}
        <Button type="submit">
          {loading ? (
            <Spinner aria-label="Default status example" />
          ) : (
            "Đăng ký"
          )}
        </Button>
        <span className="text-right">
          Đã có tài khoản?
          <Link to="/signin" className="text-blue-500 hover:underline ml-1">
            Đăng nhập
          </Link>
        </span>
        <div>Tài khoản admin: quantrivien - 123456</div>
      </form>
    </div>
  );
}
