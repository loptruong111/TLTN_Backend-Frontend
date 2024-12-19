import { FaEye, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function DestinationCard({ destination }) {
  return (
    <Link to={`/destination/${destination._id}`}>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:scale-[101%] hover:-translate-y-2 transition-transform duration-200 flex flex-col">
        <img
          className="rounded-t-lg aspect-video w-full"
          src={destination.image}
          alt={destination.name}
        />
        <div className="px-4 pt-2 pb-1 flex flex-col flex-grow">
          <h5 className="text-xl min-h-[3.5rem] font-bold text-gray-900 mb-2 line-clamp-2 overflow-hidden text-ellipsis">
            {destination.name}
          </h5>

          <p className="text-gray-500 text-xs mb-4">
            {destination.address.provinceId?.name
              ? destination.address.districtId?.name
                ? `${destination.address.districtId.name}, ${destination.address.provinceId.name}`
                : destination.address.provinceId.name
              : "Địa chỉ đang cập nhật"}
          </p>
          <div className="flex items-center justify-between py-2 px-4 text-gray-600 text-sm border-t border-gray-200">
            <div className="flex items-center">
              <FaStar className="text-yellow-400 mr-1" />
              <span>{destination.averageRating || 5} / 5</span>
            </div>
            <div className="flex items-center">
              <FaEye className="mr-1" />
              <span>{destination.views || 0} lượt xem</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
