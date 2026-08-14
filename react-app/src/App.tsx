import {
  createBrowserRouter,
  RouterProvider,
  Link,
  Navigate,
  Outlet,
  NavLink,
} from "react-router-dom";
import Home, { LoadData } from "./pages/Home";
import Counter from "./pages/Counter";
import UseContext from "./pages/UseContext";
import Form from "./pages/Form";
import UseReducer from "./pages/UseReducer";
import UseRef from "./pages/UseRef";
import UserList from "./pages/UserList/UserList";
import UserForm from "./pages/UserList/UserForm";
import Navbar from "./store/navbar";
import LoginForm from "./store/login";
import HomeRedux from "./store/home-redux";
import Login from "./pages/authPage/Login";
import Register from "./pages/authPage/Register";
import UseFormHook from "./pages/UseFormHook";
import Name from "./pages/Name";

import ProductPage, {
  ProductLoader,
  WishListAction,
} from "./pages/Product/ProductPage";

import ProtectedRouteLayer from "./component/ProtectedRouteLayer";
import UseBlocker from "./pages/UserList/UseBlocker";
import NotFoundPage from "./component/NotFound";
import InputForm from "./pages/Forms/InputForm";
import { action as InputAction } from "./pages/Forms/InputForm";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/UserList" />,
      },
      {
        path: "/home",
        element: <Home />,
        loader: LoadData,
      },
      {
        path: "/counter",
        element: <Counter />,
      },
      {
        path: "/form",
        element: <Form />,
      },
      {
        path: "/UseContext",
        element: <UseContext />,
      },
      {
        path: "/UseRef",
        element: <UseRef />,
      },
      {
        path: "/UseReducer",
        element: <UseReducer />,
      },
      {
        path: "/UserForm",
        element: <UserForm />,
      },
      {
        path: "/Login",
        element: <LoginForm />,
      },
      {
        path: "/Navbar",
        element: <Navbar />,
      },
      {
        path: "/LoginAuth",
        element: <Login />,
      },
      {
        path: "/homeRedux",
        element: <HomeRedux />,
      },
      {
        path: "/Register",
        element: <Register />,
      },
      {
        path: "/UseFormHook",
        element: <UseFormHook />,
      },
      {
        path: "/Name",
        element: <Name />,
      },
      {
        path: "/InputForm",
        Component: InputForm,
        action: InputAction,
      },
      {
        path: "/UseBlocker",
        element: <UseBlocker />,
      },
      {
        path: "/ProductPage",
        element: <ProductPage />,
        loader: ProductLoader,
        action: WishListAction,
      },
      {
        element: <ProtectedRouteLayer />,
        children: [{ path: "/UserList", element: <UserList /> }],
      },
    ],
  },
]);

function RootLayout() {
  return (
    <div>
      <nav className="bg-gray-800 text-white p-4 flex space-x-4">
        <NavLink to="/home"> Home </NavLink>

        <Link to="/counter"> Counter </Link>

        {/* <Link to="/form"> Form </Link>

        <Link to="/UseContext"> Hook UseContext </Link>

        <Link to="/UseReducer"> Hook UseReducer </Link>

        <Link to="/UseRef"> Hook UseRef </Link> */}
        <span> | </span>
        <Link to="/UserList"> User List </Link>
        <Link to="/Navbar"> Navbar </Link>
        <Link to="/Login"> Login </Link>

        <Link to="/homeRedux"> Home Redux </Link>

        <Link to="/LoginAuth"> Login auth </Link>
        <Link to="/Register"> Register auth</Link>
        <Link to="/UseFormHook"> UseFormHook </Link>
        <Link to="/Name"> Name </Link>

        <Link to="/UseBlocker"> User Blocker </Link>
        <Link to="/InputForm"> Input Form </Link>
        <Link to="/ProductPage"> Product Page </Link>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  return <RouterProvider router={router} />;
}
