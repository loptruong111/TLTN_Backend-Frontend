import { useSelector } from "react-redux"; 
import { useEffect, useState } from "react";
import UserTripCardItem from "../../components/trip/user-trip/UserTripCardItem";
import TripService from "../../services/TripService";

export default function MyTrip() {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [userTrips, setUserTrips] = useState([]);

  const getUserTrips = async () => {
    try {
      const queryParams = new URLSearchParams({
        userId: user._id,
        isDeleted: false,
      }).toString();
      const res = await TripService.gets(queryParams);

      if (res.status) {
        setUserTrips(res.data.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getUserTrips();
  }, []);
 
  return (
    <div className="max-w-4xl mx-auto py-10 p-3">
      <div className="flex flex-row text-xl gap-2">
        <h1 className="text-2xl font-semibold">CHUYẾN ĐI ĐÃ TẠO</h1>
        <span className="border border-black px-1 m-0">{userTrips.length}</span>
      </div>

      <div className="justify-items-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-5">
        {userTrips.map((trip, index) => (
          <UserTripCardItem trip={trip} key={index} />
        ))}
      </div>
    </div>
  );
}
