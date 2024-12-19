export default function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center ">
      <img
        src="https://cdn.prod.website-files.com/62fec8041edae129b05e72ac/63a162b657a05c31e92ebbd5_Blog-HeroImage-404-Page-Error-1600x900px.png"
        alt="Page not found illustration"
        className="max-w-72 mb-4"
      />
      <h1 className="text-3xl mb-8 text-center">
        <span>Xin lỗi!</span>
        <br />
        <span>Chúng tôi không tìm thấy trang mà bạn cần!</span>
      </h1>
      <a
        href="/"
        className="px-4 py-2 text-xl bg-teal-600 text-white rounded hover:bg-teal-700 transition"
      >
        Trở về trang chủ
      </a>
    </div>
  );
}
