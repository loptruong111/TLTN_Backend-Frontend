import { Button } from "flowbite-react";
import envVar from "../utils/envVar";

export default function Thanks() {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-6 animate-fade-in">
        🌟 Cảm ơn bạn đã ghé thăm! 🌟
      </h1>
      <div className="w-11/12 md:max-w-3xl bg-white shadow-lg rounded-lg p-6 md:p-10 mb-6 animate-fade-in-delayed">
        <p className="text-gray-600 text-lg md:text-xl mb-4 leading-relaxed">
          Sản phẩm thực hiện bởi{" "}
          <span className="font-semibold text-blue-500">
            sinh viên Trần Nguyên Khang
          </span>{" "}
          cùng với sự hướng dẫn tận tình của
          <span className="font-semibold text-blue-500">
            TS. Văn Thế Thành
          </span>{" "}
          và <span className="font-semibold text-blue-500">anh Minh Tiến</span>.
        </p>
        <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
          Sản phẩm đề tài được xây dựng dựa trên công sức và trí tuệ của Thầy và
          trò Khoa CNTT, Trường ĐH Sư Phạm TP.HCM, cũng như nhận được sự tư vấn
          và hỗ trợ từ bạn bè, đồng nghiệp và mọi người xung quanh. Sản phẩm này
          được phép kế thừa, phát triển và triển khai miễn phí cho các cá nhân,
          tổ chức và cộng đồng.
        </p>
      </div>

      {/* Button với hiệu ứng hover */}
      <Button
        href={envVar.link_sourcecode}
        target="_blank"
        className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium px-6 py-3 rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
      >
        🚀 Lấy mã nguồn
      </Button>
    </div>
  );
}
