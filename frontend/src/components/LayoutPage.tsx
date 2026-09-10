import { Outlet } from "react-router-dom";
import { logoutUser } from "../Apis/auth-api";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./ContextProvider";

export default function LayoutPage() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  let userRole = user?.role;

  function NavLink() {
    return (
      <div>
        <nav className="bg-gray-800 text-white p-4">
          <Link to="/ProductsList" className="mr-4">
            Products
          </Link>

          {userRole === "admin" && (
            <Link to="/users-list" className="mr-4">
              Users
            </Link>
          )}

          <Link to="/messagePage" className="mr-4">
            Message
          </Link>
        </nav>
      </div>
    );
  }

  async function handleLogout() {
    const result = await logoutUser();
    if (result) {
      logout();
      console.log("layout Logout successful");
      navigate("/login");
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-xl font-bold">My App</h1>
        <NavLink />
        <button className="underline text-red-500 " onClick={handleLogout}>
          Logout
        </button>
      </header>
      <main>
        <Outlet />
      </main>

      <footer className="bg-gray-800 text-white p-4 mt-auto">
        <p>&copy; 2026 My App. All rights reserved.</p>
      </footer>
    </div>
  );
}
