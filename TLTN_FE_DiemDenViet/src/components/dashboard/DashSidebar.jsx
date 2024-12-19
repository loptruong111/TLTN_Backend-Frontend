import { Sidebar } from "flowbite-react";
import { HiChartPie } from "react-icons/hi";
import { FaMap, FaMapMarkerAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdCategory } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import { BiSolidCommentDetail } from "react-icons/bi";
import { RiShieldUserFill } from "react-icons/ri";

export default function DashSidebar({ setSidebarOpen }) {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleLinkClick = () => {
    setSidebarOpen(false);
  };

  return (
    <Sidebar className="w-full h-full">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to="/dashboard?tab=dash" onClick={handleLinkClick}>
            <Sidebar.Item active={tab === "dash"} icon={HiChartPie} as="div">
              Trang chính
            </Sidebar.Item>
          </Link>
          <Sidebar.Collapse icon={FaMapLocationDot} label="Địa chỉ">
            <Link to="/dashboard?tab=province" onClick={handleLinkClick}>
              <Sidebar.Item active={tab === "province"} icon={FaMap} as="div">
                Tỉnh thành
              </Sidebar.Item>
            </Link>
            <Link to="/dashboard?tab=district" onClick={handleLinkClick}>
              <Sidebar.Item active={tab === "district"} icon={FaMap} as="div">
                Quận huyện
              </Sidebar.Item>
            </Link>
            <Link to="/dashboard?tab=ward" onClick={handleLinkClick}>
              <Sidebar.Item active={tab === "ward"} icon={FaMap} as="div">
                Phường xã
              </Sidebar.Item>
            </Link>
          </Sidebar.Collapse>
          <Sidebar.Collapse icon={MdCategory} label="Loại điể đến">
            <Link to="/dashboard?tab=category" onClick={handleLinkClick}>
              <Sidebar.Item
                active={tab === "category"}
                icon={MdCategory}
                as="div"
              >
                Danh mục chính
              </Sidebar.Item>
            </Link>
            <Link to="/dashboard?tab=subcategory" onClick={handleLinkClick}>
              <Sidebar.Item
                active={tab === "subcategory"}
                icon={MdCategory}
                as="div"
              >
                Danh mục phụ
              </Sidebar.Item>
            </Link>
          </Sidebar.Collapse>
          <Link to="/dashboard?tab=destination" onClick={handleLinkClick}>
            <Sidebar.Item
              active={tab === "destination"}
              icon={FaMapMarkerAlt}
              as="div"
            >
              Điểm đến
            </Sidebar.Item>
          </Link>
          <Link to="/dashboard?tab=review" onClick={handleLinkClick}>
            <Sidebar.Item
              active={tab === "review"}
              icon={BiSolidCommentDetail}
              as="div"
            >
              nhận xét
            </Sidebar.Item>
          </Link>
          <Link to="/dashboard?tab=user" onClick={handleLinkClick}>
            <Sidebar.Item
              active={tab === "user"}
              icon={RiShieldUserFill}
              as="div"
            >
              Tài khoản
            </Sidebar.Item>
          </Link>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
