import { Drawer, Sidebar } from "flowbite-react";
import { Link } from "react-router-dom";
export default function HeaderDrawer({ isOpenDrawer, setIsOpenDrawer, path }) {
  const handleClose = () => setIsOpenDrawer(false);

  return (
    <Drawer open={isOpenDrawer} onClose={handleClose}>
      <Drawer.Header title="Điểm Đến Việt" />
      <Drawer.Items>
        <Sidebar
          aria-label="Sidebar with multi-level dropdown example"
          className="[&>div]:bg-transparent [&>div]:p-0"
        >
          <div className="flex h-full flex-col justify-between py-2">
            <Sidebar.Items>
              <Sidebar.ItemGroup>
                <Link to="/">
                  <Sidebar.Item
                    active={path === "/"}
                    as="div"
                    onClick={handleClose}
                  >
                    Home
                  </Sidebar.Item>
                </Link>
                <Link to="/destination">
                  <Sidebar.Item
                    active={path === "/destination"}
                    as="div"
                    onClick={handleClose}
                  >
                    Tra cứu điểm đến
                  </Sidebar.Item>
                </Link>
                <Link to="/generate-trip">
                  <Sidebar.Item
                    active={path === "/generate-trip"}
                    as="div"
                    onClick={handleClose}
                  >
                    AI tư vấn
                  </Sidebar.Item>
                </Link>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </div>
        </Sidebar>
      </Drawer.Items>
    </Drawer>
  );
}
