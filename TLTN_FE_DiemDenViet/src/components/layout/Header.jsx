import { Button, Navbar, Dropdown, Avatar } from "flowbite-react";
import Brand from "../common/Brand";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slice/userSlice";
import AuthService from "../../services/AuthService";
import HeaderDrawer from "../common/HeaderDrawer";

export default function Header() {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const handleSignOut = async () => {
    try {
      const res = await AuthService.signOut();
      return dispatch(logout());
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`px-3 shadow-md top-0 w-full fixed content-center h-16 z-40 bg-inherit ${
        isScrolled && "bg-white"
      }`}
    >
      <Navbar fluid rounded className="bg-inherit max-w-6xl mx-auto">
        <Brand />
        <div className="flex md:order-2">
          {isAuthenticated ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={<Avatar alt="User settings" img={user.avatar} rounded />}
            >
              <Dropdown.Header>
                <span className="block text-sm font-semibold">{`${user.name}`}</span>
                <span className="block text-sm font-semibold">{`@${user.username}`}</span>
              </Dropdown.Header>
              <Link to="/profile">
                <Dropdown.Item>Tài khoản</Dropdown.Item>
              </Link>
              <Link to="/trip/mytrip">
                <Dropdown.Item>Chuyến đi đã tạo</Dropdown.Item>
              </Link>
              {user.isAdmin && (
                <Link to="/dashboard">
                  <Dropdown.Item>Quản lý</Dropdown.Item>
                </Link>
              )}
              <Dropdown.Divider />
              <button type="button" className="w-full" onClick={handleSignOut}>
                <Dropdown.Item as="div">Đăng xuất</Dropdown.Item>
              </button>
            </Dropdown>
          ) : (
            <Link to="/signin">
              <Button>Đăng nhập</Button>
            </Link>
          )}
          <Navbar.Toggle
            onClick={() => setIsOpenDrawer(true)}
            className="text-gray-800"
          />
        </div>
        <Navbar.Collapse>
          <Link to="/" className="text-lg font-semibold">
            <Navbar.Link active={path === "/"} as="div">
              Trang chủ
            </Navbar.Link>
          </Link>
          <Link to="/destination" className="text-lg font-semibold">
            <Navbar.Link active={path === "/destination"} as="div">
              Tra cứu điểm đến
            </Navbar.Link>
          </Link>
          <Link to="/trip/create" className="text-lg font-semibold">
            <Navbar.Link active={path === "/generate-trip"} as="div">
              Gợi ý lịch trình
            </Navbar.Link>
          </Link>
        </Navbar.Collapse>
      </Navbar>

      {/* Drawer Component */}
      <HeaderDrawer
        isOpenDrawer={isOpenDrawer}
        setIsOpenDrawer={setIsOpenDrawer}
        path={path}
      />
    </div>
  );
}
