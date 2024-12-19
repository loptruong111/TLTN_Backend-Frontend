import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfoSession from "../../components/trip/view-trip/InfoSession";
import Hotels from "../../components/trip/view-trip/Hotels";
import PlacesToVisit from "../../components/trip/view-trip/PlacesToVisit";
import ViewTripAction from "../../components/trip/view-trip/ViewTripAction";
import TripService from "../../services/TripService";
import { useSelector } from "react-redux";

export default function ViewTrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState([]);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const getTripData = async () => {
    try {
      const res = await TripService.get(tripId);

      if (res.status) {
        setTrip(res.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    tripId && getTripData();
  }, [tripId]);

  return (
    <div className="max-w-3xl mx-auto py-10 p-3">
      {/* infomation session */}
      <InfoSession selection={trip.selection} />
      {/* recomened hotels */}
      <Hotels hotels={trip?.data?.hotelOptions} />
      {/* daily plan */}
      <PlacesToVisit itinerary={trip?.data?.itinerary} />
      {user && user._id === trip.userId && <ViewTripAction itemId={tripId} />}
    </div>
  );
}
