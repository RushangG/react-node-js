import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/auth/login";
import ProductsList from "./pages/Products/products-list";
import AddProduct from "./pages/Products/product-add-edit";
import Register from "./pages/auth/register";
import UserList from "./pages/Users/user-list";
import ProtectedRoutes from "./components/protectedRoutes";
import LayoutPage from "./components/LayoutPage";
const router = createBrowserRouter([
  {
    path: "/",
    ErrorBoundary: () => <div>Page Not Found</div>,
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
        element: <ProtectedRoutes />,

        children: [
          {
            element: <LayoutPage />,
            children: [
              {
                path: "/ProductsList",
                element: <ProductsList />,
              },
              {
                path: "/products/add",
                element: <AddProduct />,
              },
              {
                path: "/users-list",
                element: <UserList />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
