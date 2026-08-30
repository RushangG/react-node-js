import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/auth/login";
import ProductsList from "./pages/Products/products-list";
import AddProduct from "./pages/Products/product-add-edit";
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
      {
        path: "/products/add",
        element: <AddProduct />,
      }
    ],
  },
]);

export default router;
