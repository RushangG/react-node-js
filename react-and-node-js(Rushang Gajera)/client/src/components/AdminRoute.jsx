import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../pages/ContextProvider";
import { jwtDecode } from "jwt-decode";

export default function ProtectedRoute() {
  const { accessToken } = useAuth();

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  let decodedToken = null;

  try {
    decodedToken = jwtDecode(accessToken);

    if (decodedToken.exp * 1000 < Date.now()) {
      return <Navigate to="/login" replace />;
    }

    if (decodedToken.role !== "admin") {
      return <Navigate to="/login" replace />;
    }
  } catch (error) {
    console.error("Error decoding token:", error);
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
}
