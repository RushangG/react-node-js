import { Outlet, Link, NavLink } from "react-router-dom";
import "./App.css";

export default function Layout() {
  return (
    <>
      <h1> React </h1>

      <div style={{ display: "flex" }}>
        <nav
          className="nav-bar"
          style={{
            padding: "1rem",
          }}
        >
          <NavLink
            style={({ isActive }) => {
              return { fontWeight: isActive ? "bold" : "" };
            }}
            to={"Home"}
          >
            Home
          </NavLink>

          <NavLink
            style={({ isActive }) => {
              return { fontWeight: isActive ? "bold" : "" };
            }}
            to={"About"}
          >
            About
          </NavLink>

          <NavLink
            style={({ isActive }) => {
              return { fontWeight: isActive ? "bold" : "" };
            }}
            to={"Names"}
          >
            User Form
          </NavLink>

          <NavLink
            style={({ isActive }) => {
              return { fontWeight: isActive ? "bold" : "" };
            }}
            to={"CharacterCount"}
          >
            CharacterCount
          </NavLink>

          <NavLink
            style={({ isActive }) => {
              return { fontWeight: isActive ? "bold" : "" };
            }}
            to={"Counter"}
          >
            Counter
          </NavLink>

          <NavLink
            style={({ isActive }) => {
              return { fontWeight: isActive ? "bold" : "" };
            }}
            to={"/"}
          >
            FirstPage
          </NavLink>

          <NavLink
            style={({ isActive }) => {
              return { fontWeight: isActive ? "bold" : "" };
            }}
            to={"/Login"}
          >
            Login
          </NavLink>

          <NavLink
            style={({ isActive }) => {
              return { fontWeight: isActive ? "bold" : "" };
            }}
            to={"/admin/names"}
          >
            AdminNames
          </NavLink>
        </nav>
      </div>

      <div>
        <Outlet />
      </div>
    </>
  );
}
