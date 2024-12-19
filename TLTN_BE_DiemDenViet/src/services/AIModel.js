/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import envVar from "../utils/envVariable.js";

const apiKey = envVar.gemini_apikey;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Tạo kế hoạch du lịch cho:\nĐịa điểm: Thành phố Hồ Chí Minh, trong 3 ngày cho một cặp đôi với ngân sách tiết kiệm. Cung cấp danh sách các lựa chọn khách sạn bao gồm tên khách sạn, địa chỉ khách sạn, giá, URL hình ảnh khách sạn, tọa độ địa lý, đánh giá, mô tả.\nGợi ý lịch trình với tên địa điểm, thông tin chi tiết về địa điểm, URL hình ảnh địa điểm, tọa độ địa lý, giá vé, thời gian di chuyển đến từng địa điểm trong 3 ngày với kế hoạch mỗi ngày, cùng với thời gian tốt nhất để tham quan.\nĐầu ra dưới dạng JSON, tên biến bằng tiếng anh nhưng giá trị, đơn vị tiền tệ bằng tiếng việt.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{"hotelOptions": [{"name": "The Reverie Saigon", "address": "22-36 Nguyen Hue Boulevard, Ben Nghe Ward, District 1, Ho Chi Minh City", "price": "từ 3.000.000 VND/đêm", "imageUrl": "https://www.the-reverie.com/media/wysiwyg/home/gallery/image-7.jpg", "coordinates": {"latitude": 10.7737, "longitude": 106.6988}, "rating": 4.5, "description": "Khách sạn sang trọng 5 sao với tầm nhìn đẹp ra thành phố, các phòng nghỉ hiện đại và dịch vụ cao cấp."}, {"name": "Hotel Des Arts Saigon", "address": "76-78 Nguyen Thi Minh Khai Street, Ben Nghe Ward, District 1, Ho Chi Minh City", "price": "từ 1.500.000 VND/đêm", "imageUrl": "https://www.hoteldesarts.com/wp-content/uploads/2018/07/DSC03817.jpg", "coordinates": {"latitude": 10.7765, "longitude": 106.6995}, "rating": 4.0, "description": "Khách sạn boutique hiện đại với phong cách nghệ thuật, phòng nghỉ trang nhã và dịch vụ thân thiện."}, {"name": "Saigon Backpackers Hostel", "address": "163 De Tham Street, District 1, Ho Chi Minh City", "price": "từ 200.000 VND/đêm", "imageUrl": "https://www.saigonbackpackers.com/images/hostel/saigon-backpackers-hostel-room.jpg", "coordinates": {"latitude": 10.7746, "longitude": 106.7011}, "rating": 4.2, "description": "Hostel giá rẻ với phòng dorm và phòng riêng, phù hợp cho du khách trẻ tuổi."}, {"name": "Avani+ Saigon Hotel", "address": "180 Le Duan Street, Ben Nghe Ward, District 1, Ho Chi Minh City", "price": "từ 2.000.000 VND/đêm", "imageUrl": "https://www.avanihotels.com/saigon/media/images/hotel/header-images/hero-image-desktop-v2.jpg", "coordinates": {"latitude": 10.7768, "longitude": 106.6983}, "rating": 3.8, "description": "Khách sạn 4 sao hiện đại với tầm nhìn ra thành phố, các phòng nghỉ thoải mái và dịch vụ chuyên nghiệp."}], "itinerary": [{"day": "Ngày 1", "plan": [{"time": "8:00 AM", "location": "Chợ Bến Thành", "details": "Khám phá khu chợ truyền thống sôi động, mua sắm các loại hàng hóa thủ công, ẩm thực địa phương.", "imageUrl": "https://www.vietnamtourism.com/images/tourism/destinations/ho-chi-minh-city/cho-ben-thanh-market.jpg", "coordinates": {"latitude": 10.7712, "longitude": 106.6994}, "price": "Miễn phí", "travelTime": "10 phút đi bộ từ khách sạn"}, {"time": "11:00 AM", "location": "Dinh Độc Lập", "details": "Tham quan dinh thự lịch sử từng là nơi làm việc của chính phủ Việt Nam Cộng hòa.", "imageUrl": "https://www.vietnamtourism.com/images/tourism/destinations/ho-chi-minh-city/dinh-doc-lap.jpg", "coordinates": {"latitude": 10.7764, "longitude": 106.6975}, "price": "20.000 VND/người", "travelTime": "15 phút đi xe máy từ Chợ Bến Thành"}, {"time": "1:00 PM", "location": "Nhà thờ Đức Bà", "details": "Chiêm ngưỡng kiến trúc độc đáo của nhà thờ cổ kính.", "imageUrl": "https://www.vietnamtourism.com/images/tourism/destinations/ho-chi-minh-city/nha-tho-duc-ba.jpg", "coordinates": {"latitude": 10.7769, "longitude": 106.6994}, "price": "Miễn phí", "travelTime": "5 phút đi bộ từ Dinh Độc Lập"}, {"time": "2:00 PM", "location": "Bưu điện Thành phố", "details": "Tham quan bưu điện cổ kính với kiến trúc Pháp.", "imageUrl": "https://www.vietnamtourism.com/images/tourism/destinations/ho-chi-minh-city/buu-dien-thanh-pho.jpg", "coordinates": {"latitude": 10.7768, "longitude": 106.6997}, "price": "Miễn phí", "travelTime": "2 phút đi bộ từ Nhà thờ Đức Bà"}, {"time": "6:00 PM", "location": "Phố đi bộ Nguyễn Huệ", "details": "Tản bộ dọc phố đi bộ, thưởng thức ẩm thực đường phố.", "imageUrl": "https://www.vietnamtourism.com/images/tourism/destinations/ho-chi-minh-city/pho-di-bo-nguyen-hue.jpg", "coordinates": {"latitude": 10.7741, "longitude": 106.6985}, "price": "Miễn phí", "travelTime": "10 phút đi bộ từ Bưu điện Thành phố"}], "bestTime": "Buổi sáng và chiều tối"}, {"day": "Ngày 2", "plan": [{"time": "9:00 AM", "location": "Bảo tàng Chứng tích Chiến tranh", "details": "Tìm hiểu về lịch sử chiến tranh Việt Nam.", "imageUrl": "https://www.vietnamtourism.com/images/tourism/destinations/ho-chi-minh-city/bao-tang-chung-tich-chien-tranh.jpg", "coordinates": {"latitude": 10.7712, "longitude": 106.6972}, "price": "30.000 VND/người", "travelTime": "20 phút đi xe máy từ khách sạn"}, {"time": "12:00 PM", "location": "Cà phê võng", "details": "Thư giãn tại một quán cà phê võng, thưởng thức cà phê Việt Nam.", "imageUrl": "https://www.vietnamtourism.com/images/tourism/destinations/ho-chi-minh-city/ca-phe-vong.jpg", "coordinates": {"latitude": 10.7687, "longitude": 106.6996}, "price": "Khoảng 30.000 VND/người", "travelTime": "15 phút đi xe máy từ Bảo tàng Chứng tích Chiến tranh"}, {"time": "2:00 PM", "location": "Chợ Lớn", "details": "Khám phá khu phố Tàu sôi động, thưởng thức ẩm thực Trung Hoa.", "imageUrl": "https://www.vietnamtourism.com/images/tourism/destinations/ho-chi-minh-city/cho-lon.jpg", "coordinates": {"latitude": 10.7672, "longitude": 106.6805}, "price": "Miễn phí", "travelTime": "30 phút đi xe máy từ quán cà phê võng"}, {"time": "6:00 PM", "location": "Bến Nhà Rồng", "details": "Tham quan bến tàu lịch sử từng là nơi xuất phát của chuyến tàu đầu tiên của Việt Nam.", "imageUrl": "https://www.vietnamtourism.com/images/tourism/destinations/ho-chi-minh-city/ben-nha-rong.jpg", "coordinates": {"latitude": 10.7781, "longitude": 106.6996}, "price": "Miễn phí", "travelTime": "20 phút đi xe máy từ Chợ Lớn"}], "bestTime": "Buổi sáng và chiều tối"}, {"day": "Ngày 3", "plan": [{"time": "9:00 AM", "location": "Công viên Tao Đàn", "details": "Tản bộ trong công viên xanh mát, thư giãn.", "imageUrl": "https://www.vietnamtourism.com/images/tourism/destinations/ho-chi-minh-city/cong-vien-tao-dan.jpg", "coordinates": {"latitude": 10.7875, "longitude": 106.6997}, "price": "Miễn phí", "travelTime": "15 phút đi xe máy từ khách sạn"}, {"time": "11:00 AM", "location": "Bảo tàng Mỹ thuật Thành phố Hồ Chí Minh", "details": "Chiêm ngưỡng các tác phẩm nghệ thuật Việt Nam.", "imageUrl": "https://www.vietnamtourism.com/images/tourism/destinations/ho-chi-minh-city/bao-tang-my-thuat-thanh-pho-ho-chi-minh.jpg", "coordinates": {"latitude": 10.7834, "longitude": 106.6952}, "price": "20.000 VND/người", "travelTime": "10 phút đi bộ từ Công viên Tao Đàn"}, {"time": "1:00 PM", "location": "Nhà hát lớn Thành phố Hồ Chí Minh", "details": "Tham quan kiến trúc độc đáo của nhà hát.", "imageUrl": "https://www.vietnamtourism.com/images/tourism/destinations/ho-chi-minh-city/nha-hat-lon-thanh-pho-ho-chi-minh.jpg", "coordinates": {"latitude": 10.7808, "longitude": 106.6978}, "price": "Miễn phí", "travelTime": "15 phút đi bộ từ Bảo tàng Mỹ thuật"}, {"time": "3:00 PM", "location": "Chợ An Đông", "details": "Mua sắm quần áo, vải vóc, phụ kiện.", "imageUrl": "https://www.vietnamtourism.com/images/tourism/destinations/ho-chi-minh-city/cho-an-dong.jpg", "coordinates": {"latitude": 10.7819, "longitude": 106.7013}, "price": "Miễn phí", "travelTime": "10 phút đi bộ từ Nhà hát lớn"}, {"time": "6:00 PM", "location": "Phố ẩm thực", "details": "Thưởng thức các món ăn đường phố đa dạng.", "imageUrl": "https://www.vietnamtourism.com/images/tourism/destinations/ho-chi-minh-city/pho-am-thuc.jpg", "coordinates": {"latitude": 10.7736, "longitude": 106.6971}, "price": "Từ 20.000 VND/món", "travelTime": "15 phút đi xe máy từ Chợ An Đông"}], "bestTime": "Buổi sáng và chiều tối"}]}\n\n```',
        },
      ],
    },
  ],
});
