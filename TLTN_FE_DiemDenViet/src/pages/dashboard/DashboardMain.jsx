import { useEffect, useState } from "react";
import { HiUserGroup, HiArrowUp, HiDocumentText } from "react-icons/hi";
import { BiSolidCommentDetail } from "react-icons/bi";
import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import UserService from "../../services/UserService";
import ReviewService from "../../services/ReviewService";
import TripService from "../../services/TripService";

export default function DashboardMain() {
  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [trips, setTrips] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [totalTrips, setTotalTrips] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthCommnets, setLastMonthReviews] = useState(0);
  const [lastMonthTrips, setLastMonthTrips] = useState(0);
  const limitOnePage = 5;
  const queryParams = new URLSearchParams({
    pageSize: limitOnePage,
    order: 1,
  }).toString();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, reviewRes, tripRes] = await Promise.all([
          UserService.gets(queryParams),
          ReviewService.gets(queryParams),
          TripService.gets(queryParams),
        ]);

        const handleResponse = (res, setData, setTotal, setLastMonth) => {
          if (res?.status) {
            setData(res.data.data);
            setTotal(res.data.total);
            setLastMonth(res.data.lastMonth);
          }
        };

        handleResponse(userRes, setUsers, setTotalUsers, setLastMonthUsers);
        handleResponse(
          reviewRes,
          setReviews,
          setTotalReviews,
          setLastMonthReviews
        );
        handleResponse(tripRes, setTrips, setTotalTrips, setLastMonthTrips);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dark:bg-slate-900 bg-gray-100 w-full min-h-screen p-3">
      <div className="grid e grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white flex justify-between rounded-md shadow-md p-3 dark:bg-slate-800">
          <div>
            <h1 className="text-gray-500 text-xl">Tổng số người dùng</h1>
            <p className="text-3xl p-2">{totalUsers}</p>
            <div className="flex py-1">
              <span className="flex items-center  text-green-500 pr-1">
                <HiArrowUp />
                {lastMonthUsers}
              </span>
              <span className="">tháng trước</span>
            </div>
          </div>
          <HiUserGroup className="bg-teal-600 text-5xl rounded-full p-3 text-white" />
        </div>
        <div className="bg-white flex justify-between rounded-md shadow-md p-3 dark:bg-slate-800">
          <div>
            <h1 className="text-gray-500 text-xl">Tổng số nhận xét</h1>
            <p className="text-3xl p-2">{totalReviews}</p>
            <div className="flex py-1">
              <span className="flex items-center  text-green-500 pr-1">
                <HiArrowUp />
                {lastMonthCommnets}
              </span>
              <span className="">tháng trước</span>
            </div>
          </div>
          <BiSolidCommentDetail className="bg-indigo-600 text-5xl rounded-full p-3 text-white" />
        </div>
        <div className="bg-white flex justify-between rounded-md shadow-md p-3 dark:bg-slate-800">
          <div>
            <h1 className="text-gray-500 text-xl">Tổng số chuyến đi</h1>
            <p className="text-3xl p-2">{totalTrips}</p>
            <div className="flex py-1">
              <span className="flex items-center  text-green-500 pr-1">
                <HiArrowUp />
                {lastMonthTrips}
              </span>
              <span className="">tháng trước</span>
            </div>
          </div>
          <HiDocumentText className="bg-lime-600 text-5xl rounded-full p-3 text-white" />
        </div>
      </div>
      <div className="mt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div className="bg-white shadow-md rounded-md ">
          <div className="flex justify-between p-3 px-6 items-center font-semibold">
            <h1>Tài khoản mới</h1>
            <Button outline gradientDuoTone="purpleToPink">
              <Link to={"/dashboard?tab=users"}>Xem tất cả</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Tên người dùng</Table.HeadCell>
              <Table.HeadCell>Tên tài khoản</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {users &&
                users.map((user) => (
                  <Table.Row
                    key={user._id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell>{user.name}</Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </div>
        <div className="bg-white shadow-md rounded-md lg:col-span-2">
          <div className="flex justify-between p-3 px-6 items-center font-semibold">
            <h1>Chuyến đi mới</h1>
            <Button outline gradientDuoTone="purpleToPink">
              <Link to={"/dashboard?tab=trip"}>Xem tất cả</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Tên chuyến đi</Table.HeadCell>
              <Table.HeadCell>Tên người dùng</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {trips &&
                trips.map((trip) => (
                  <Table.Row key={trip._id} className="bg-white ">
                    <Table.Cell>{trip.selection.location}</Table.Cell>
                    <Table.Cell>{trip.userId.name}</Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </div>
        <div className="bg-white shadow-md rounded-md lg:col-span-full">
          <div className="flex justify-between p-3 px-6 items-center font-semibold">
            <h1>nhận xét mới</h1>
            <Button outline gradientDuoTone="purpleToPink">
              <Link to={"/dashboard?tab=review"}>Xem tất cả</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Id người dùng</Table.HeadCell>
              <Table.HeadCell>Sao</Table.HeadCell>
              <Table.HeadCell>nhận xét</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {reviews &&
                reviews.map((review, index) => (
                  <Table.Row
                    key={index}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell>{review.userId}</Table.Cell>
                    <Table.Cell>{review.rating}</Table.Cell>
                    <Table.Cell>{review.comment}</Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
}
