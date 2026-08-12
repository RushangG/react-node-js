import { Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./pages/Home";
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
import ProtectedRouteLayer from "./component/ProtectedRouteLayer";

export default function App() {
  return (
    <div>
      <nav className="bg-gray-800 text-white p-4 flex space-x-4">
        <Link to="/home"> Home </Link>

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
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/UserList" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/form" element={<Form />} />
        <Route path="/UseContext" element={<UseContext />} />
        <Route path="/UseRef" element={<UseRef />} />
        <Route path="/UseReducer" element={<UseReducer />} />
        {/* <Route path="/UserList" element={<UserList />} /> */}
        <Route path="/UserForm" element={<UserForm />} />
        <Route path="/Login" element={<LoginForm />} />
        <Route path="/Navbar" element={<Navbar />} />
        <Route path="/LoginAuth" element={<Login />} />
        <Route path="/homeRedux" element={<HomeRedux />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/UseFormHook" element={<UseFormHook />} />
        <Route path="/Name" element={<Name />} />

        <Route element={<ProtectedRouteLayer />}>
          <Route path="/UserList" element={<UserList />} />
        </Route>
      </Routes>
    </div>
  );
}
