import { Button } from "flowbite-react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <div className="flex flex-col items-center justify-center mt-10">
      <h1 className="text-xl font-semibold mb-4">
        Chức năng yêu cầu đăng nhập
      </h1>
      <Link to="/signin">
        <Button>Đăng nhập</Button>
      </Link>
    </div>
  );
}
