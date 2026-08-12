import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRouteLayer() {
  const userValue = localStorage.getItem("userProfile");
  const location = useLocation();

  console.log("userValue:", userValue);
  console.log("location:", location);

  if (userValue === null) {
    return <Navigate to="/LoginAuth" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
