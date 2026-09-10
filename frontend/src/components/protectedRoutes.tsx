import { useState, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./ContextProvider";
export default function ProtectedRoutes() {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  // const token = localStorage.getItem("authToken");

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else {
    return <Outlet />;
  }
}
