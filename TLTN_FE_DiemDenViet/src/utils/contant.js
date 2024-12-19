export const SelectTravelesList = [
  {
    id: 1,
    title: "Một mình",
    description: "Độc hành khám phá",
    icon: "✈️",
    pepple: "1",
  },
  {
    id: 2,
    title: "Cặp đôi",
    description: "Đồng hành cùng nhau",
    icon: "🥂",
    pepple: "1",
  },
  {
    id: 3,
    title: "Gia dình",
    description: "Gắn kết cùng người thân",
    icon: "🏡",
    pepple: "1",
  },
  {
    id: 4,
    title: "Bạn bè",
    description: "Những người bạn cùng phiêu lưu",
    icon: "⛵",
    pepple: "1",
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Rẻ",
    description: "Chú trọng đến việc tiết kiệm chi phí",
    icon: "💵",
  },
  {
    id: 2,
    title: "Trung bình",
    description: "Giữ chi phí ở mức vừa phải",
    icon: "💰",
  },
  {
    id: 3,
    title: "Xa xỉ",
    description: "Không lo về chi phí",
    icon: "💸",
  },
];

export const AI_PROMPT =
  "Tạo kế hoạch du lịch cho:\nĐịa điểm: {location}, trong {noOfDay} ngày cho {traveler} với ngân sách {budget}. Cung cấp danh sách các lựa chọn khách sạn bao gồm tên khách sạn, địa chỉ khách sạn, giá, URL hình ảnh khách sạn, tọa độ địa lý, nhận xét, mô tả.\nGợi ý lịch trình với tên địa điểm, thông tin chi tiết về địa điểm, URL hình ảnh địa điểm, tọa độ địa lý, giá vé, thời gian di chuyển đến từng địa điểm trong {noOfDay} ngày với kế hoạch mỗi ngày, cùng với thời gian tốt nhất để tham quan.\nĐầu ra dưới dạng JSON, tên biến bằng tiếng anh nhưng giá trị, đơn vị tiền tệ bằng tiếng việt.";
