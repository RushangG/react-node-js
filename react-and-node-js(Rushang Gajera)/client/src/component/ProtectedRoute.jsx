import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../pages/ContextProvider";

const ProtectedRoute = () => {
  const { accessToken } = useAuth();

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  let decodedToken = null; 

  try {
    decodedToken = jwtDecode(accessToken);
    if(decodedToken.exp * 1000 < Date.now()) {
      return <Navigate to="/login" replace />;
    }
  }
  catch (error) {
    console.error("Error decoding token:", error);
    return <Navigate to="/login" replace />;
  }

  
  return <Outlet />;
};

export default ProtectedRoute;