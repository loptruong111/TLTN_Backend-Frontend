import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/layout/Header";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import Footer from "./components/layout/Footer";
import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SignIn";
import { useEffect } from "react";
import { useDispatch } from "react-redux"; 
import { setUser } from "./redux/slice/userSlice";
import DestinationSearch from "./pages/destination/DestinationSearch";
import DestinationDetail from "./pages/destination/DestinationDetail";
import Profile from "./pages/Profile";
import PrivateRoute from "./routes/PrivateRoute";
import AdminPrivateRoute from "./routes/AdminPrivateRoute";
import Dashboard from "./components/layout/Dashboard";
import CreateDestination from "./pages/destination/CreateDestination";
import UpdateDestination from "./pages/destination/UpdateDestination";
import CreateTrip from "./pages/trip/CreateTrip";
import ViewTrip from "./pages/trip/ViewTrip";
import MyTrip from "./pages/trip/MyTrip";
import AuthService from "./services/AuthService";
import Thanks from "./pages/Thanks";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      const userFromToken = await AuthService.getUserByToken(); 
      dispatch(setUser(userFromToken));
    };

    fetchUser();
  }, [dispatch]);
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow">
          <div className="h-16 w-full"></div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/destination" element={<DestinationSearch />} />
            <Route path="/destination/:id" element={<DestinationDetail />} />
            <Route path="/trip/:tripId" element={<ViewTrip />} />
            <Route path="/thanks" element={<Thanks />} />

            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/trip/create" element={<CreateTrip />} />
              <Route path="/trip/mytrip" element={<MyTrip />} />
            </Route>

            <Route element={<AdminPrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route
                path="/destination/create"
                element={<CreateDestination />}
              />
              <Route
                path="/destination/:destinationId/update"
                element={<UpdateDestination />}
              />
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
