import { Link } from "react-router-dom";

export default function Hotels({ hotels }) {
  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Khách sạn gợi ý</h2>
      <div className="grid grid-cols-2 my-5 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {hotels?.map((hotel, index) => (
          <Link
            to={
              "https://www.google.com/maps/search/?api=1&query=" +
              hotel?.name +
              " " +
              hotel?.address
            }
            target="_blank"
            key={index}
          >
            <div className="hover:scale-105 transition-all cursor-pointer">
              <img
                src="/img_trip.webp"
                alt="hotel"
                className="rounded-xl h-[180px] w-full object-cover"
              />
              <div className="my-2 flex flex-col gap-2">
                <h2 className="font-medium">{hotel?.name}</h2>
                <h2 className="text-xs text-gray-500 ">📍 {hotel?.address}</h2>
                <h2 className="text-sm">💰 {hotel?.price}</h2>
                <h2 className="text-sm">⭐ {hotel?.rating} sao</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
