import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import img_danang from "/img_danang.jpg";
import img_sapa from "/img_sapa.jpg";
import img_cantho from "/img_cantho.jpg";
import img_hcm from "/img_hcm.jpg";

export default function Home() {
  return (
    <div>
      {/* Hero section */}
      <section className="top-0 left-0 w-full -z-10 content-center min-h-screen">
        <img
          src="/img_hero.JPG"
          alt="image hero"
          className="absolute object-cover w-full h-full -z-20 top-0 left-0"
        />
        <div className="items-center z-10 justify-center h-full w-full bg-black bg-opacity-30 text-white p-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Khám Phá Kế Hoạch Du Lịch Cùng AI
          </h1>
          <p className="text-md md:text-xl mb-6">
            Tìm kiếm địa điểm du lịch tuyệt vời và tư vấn hành trình phù hợp
            nhất với bạn dự vào trí tuệ nhân tạo. Tất cả chỉ với một cú nhấp
            chuột!
          </p>
          <Link to="/trip/create" className="flex justify-center">
            <Button>Khám Phá Ngay</Button>
          </Link>
        </div>
      </section>
      {/* Destination section */}
      <section className=" py-10 px-4 md:py-12 md:px-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              Khám Phá Các Địa Điểm Du Lịch Trên Khắp Cả Nước
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-6">
              Từ những bãi biển thơ mộng, những thành phố nhộn nhịp cho đến các
              danh lam thắng cảnh nổi tiếng, hãy để chúng tôi giúp bạn tìm kiếm
              địa điểm du lịch lý tưởng cho kỳ nghỉ sắp tới của bạn.
            </p>
            <div className="flex justify-center">
              <Link to="/destination">
                <button className="bg-gray-950 hover:bg-black text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:scale-105 transition-transform">
                  Tìm Hiểu Thêm
                </button>
              </Link>
            </div>
          </div>

          <div className="md:w-1/2 grid grid-cols-2 gap-4">
            <img
              src={img_danang}
              alt="img_danang"
              className="aspect-video object-cover w-full h-full rounded-lg shadow-md hover:scale-105 transition-transform"
            />
            <img
              src={img_sapa}
              alt="img_danang"
              className="aspect-video object-cover w-full h-full rounded-lg shadow-md hover:scale-105 transition-transform"
            />
            <img
              src={img_cantho}
              alt="img_cantho"
              className="aspect-video object-cover w-full h-full rounded-lg shadow-md hover:scale-105 transition-transform"
            />
            <img
              src={img_hcm}
              alt="img_hcm"
              className="aspect-video object-cover w-full h-full rounded-lg shadow-md hover:scale-105 transition-transform"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
