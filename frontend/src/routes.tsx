import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/auth/login";
import ProductsList from "./pages/Products/products-list";
import Register from "./pages/auth/register";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <Navigate to="/Login" />,
      },
      {
        path: "/Login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/ProductsList",
        element: <ProductsList />,
      },
    ],
  },
]);

export default router;
