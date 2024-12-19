import { Link } from "react-router-dom";

export default function PlaceCard({ place }) {
  return (
    <Link
      to={"https://www.google.com/maps/search/?api=1&query=" + place?.location}
      target="_blank"
    >
      <h2 className="font-medium text-sm text-orange-600">{place?.time}</h2>
      <div
        className=" border rounded-xl p-3 mt-2 flex gap-5 
        hover:scale-105 transition-all hover:shadow-md cursor-pointer"
      >
        <img
          src="/img_trip.webp"
          alt="place"
          className="w-[130px] h-[130px] rounded-xl object-cover"
        />
        <div>
          <h2 className="font-bold text-lg">{place?.location}</h2>
          <p className="text-sm text-gray-400">{place?.details}</p>
          <h2 className="mt-2">🕙 {place?.travelTime}</h2>
          <h2 className="mt-2">🎟️ {place?.price}</h2>
        </div>
      </div>
    </Link>
  );
}
