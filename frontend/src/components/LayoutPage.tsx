import { Outlet } from "react-router-dom";
import { logout } from "../Apis/auth-api";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
export default function LayoutPage() {
  const navigate = useNavigate();
  let userRole = "";
  const userValue = localStorage.getItem("authToken");
  if (!userValue) {
    console.error("Invalid token or missing role");
    return null; // or handle the error as needed
  } else {
    const decodedToken: any = jwtDecode(userValue as string);

    userRole = decodedToken.role;
  }

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
        </nav>
      </div>
    );
  }

  async function handleLogout() {
    const result = await logout();
    if (result) {
      console.log("Logout successful");
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
