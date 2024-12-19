import { Card } from "flowbite-react";
import { HiClock } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function UserTripCardItem({ trip }) {
  return (
    <Link to={`/trip/${trip._id}`}>
      <Card className="max-w-sm" imgAlt="trip image" imgSrc="/img_trip.webp">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {trip.selection.location}
        </h5>
        <p className="text-gray-700">
          Dành cho
          <span className="font-semibold">{trip.selection.traveler}</span> kéo
          dài
          <span className="font-semibold">{trip.selection.noOfDay} ngày</span>
          với chi phí
          <span className="font-semibold"> {trip.selection.budget}</span>.
        </p>
        <p className="flex flex-row justify-end items-center text-gray-700 text-sm">
          <HiClock />
          {new Date(trip.createdAt).toLocaleString()}
        </p>
      </Card>
    </Link>
  );
}
