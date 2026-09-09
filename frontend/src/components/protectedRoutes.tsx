import { useState, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./ContextProvider";
export default function ProtectedRoutes() {

  const { isAuthenticated } = useAuth();

  // const token = localStorage.getItem("authToken");

  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else {
    return <Outlet />;
  }
}
