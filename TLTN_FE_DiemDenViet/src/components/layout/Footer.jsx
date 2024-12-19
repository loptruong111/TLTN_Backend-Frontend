export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="text-center border-t p-3 z-50 bg-white">
      @{currentYear} Tiểu luận tốt nghiệp - Trần Nguyên Khang
    </div>
  );
}
