import { useState } from "react";
import { Outlet, Link, NavLink } from "react-router-dom";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
import Welcome from "./Welcome";
import ProfileCard from "./ProfileCard";
import Counter from "./Counter.jsx";
import CharacterCount from "./CharacterCount.jsx";
import Name from "./Name.jsx";
import ErrorPage from "./ErrorPage.jsx";
import FirstPage from "./FirstPage.jsx";
import Home from "./Home.jsx";
import About from "./About.jsx";
import Layout from "./layout.jsx";
import Login from "./pages/Login.jsx";
import AdminNames from "./pages/AdminNames.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminRoute from "./components/AdminRoute.jsx";

function App() {
  const router = createBrowserRouter([
    {
      // path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <FirstPage />,
        },
        {
          element: <ProtectedRoute />,
          children: [
            {
              path: "/Names",
              element: <Name />,
            },
          ],
        },
        {
          path: "Home",
          element: <Home />,
        },
        {
          path: "About",
          element: <About />,
        },

        {
          path: "CharacterCount",
          element: <CharacterCount />,
        },
        {
          path: "Counter",
          element: <Counter />,
        },
        {
          path: "Login",
          element: <Login />,
        },

        {
          element: <AdminRoute />,
          children: [
            {
              path: "/admin/names",
              element: <AdminNames />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
