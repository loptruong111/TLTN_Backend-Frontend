import PlaceCard from "./PlaceCard";

export default function PlacesToVisit({ itinerary }) {
  return (
    <div>
      <h2 className="font-bold text-lg">Điểm đến gợi ý</h2>
      {itinerary?.map((place, index) => (
        <div key={index} className="mt-5">
          <h2 className="font-medium text-lg">{place?.day}</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {place?.plan.map((place, index) => (
              <PlaceCard place={place} key={index} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
