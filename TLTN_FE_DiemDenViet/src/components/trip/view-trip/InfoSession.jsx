import { Link } from "react-router-dom";

export default function InfoSession({ selection }) {
  return (
    <div>
      <img
        src="/img_trip.webp"
        className="h=[250px] w-full object-cover rounded-md"
      />
      <div className="my-5 flex flex-col gap-2">
        <h2 className="font-bold text-2xl">
          <Link
            to={
              "https://www.google.com/maps/search/?api=1&query=" +
              selection?.location
            }
            target="_blank"
          >
            {selection?.location}
          </Link>
        </h2>
        <div className=" flex gap-5">
          <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">
            📅 {selection?.noOfDay} Ngày
          </h2>
          <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">
            💰 Chi phí {selection?.budget}
          </h2>
          <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">
            🥂 {selection?.traveler}
          </h2>
        </div>
      </div>
    </div>
  );
}
