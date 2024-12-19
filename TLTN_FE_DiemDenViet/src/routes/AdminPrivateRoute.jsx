import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function AdminPrivateRoute() {
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);
  if (loading) return <div>Loading...</div>;
  return user && user.isAdmin ? <Outlet /> : <Navigate to="signin" />;
}
