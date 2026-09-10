import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getById, updateUser, deleteRoleFromUser } from "../../Apis/user-api";

export default function UserUpdate() {
  const navigate = useNavigate();

  const location = useLocation();
  const userId = location.state?.userId;

  useEffect(() => {
    if (userId) {
      fetchUserData(userId);
    }
  }, [userId]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    UsersRoles: [],
  });

  async function fetchUserData(userId: number) {
    const data = await getById(userId);

    console.log("user data", data);
    setUser(data);
    console.log("response", data);
  }

  async function handleDeleteRole(roleId: number) {
    if (confirm("Are you sure want to delete this role from user ? ")) {
      await deleteRoleFromUser(userId, roleId);
      fetchUserData(userId); // Refresh the user data after deletion
    }
  }
  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (userId) {
      await updateUser(userId, user);
      alert("User updated successfully!");
    }

    navigate("/users-list");
  }

  return (
    <div>
      <span className="flex justify-end mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => navigate("/user-role")}
        >
          Assign Role
        </button>
      </span>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 w-80 mx-auto mt-4">
          <label htmlFor="user">User Name :</label>
          <input
            className="border rounded my-2"
            type="text"
            id="user"
            name="user"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            required
          />

          <label htmlFor="email">Email :</label>
          <input
            className="border rounded my-2 "
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />

          <label htmlFor="roles">Role Name : </label>
          <div className="flex flex-col gap-2">
            {user.UsersRoles.length === 0 && (
              <p className="text-gray-500">No roles assigned , Assign Roles</p>
            )}
            {user.UsersRoles.map((role: any) => (
              <span
                key={role.roleId.id}
                className="border rounded p-2"
                onClick={() => handleDeleteRole(role.roleId.id)}
              >
                {role.roleId.name}{" "}
                <span className="text-red-500 cursor-pointer">[Delete]</span>
              </span>
            ))}
          </div>

          <button type="submit" className="border bg-green-400 rounded">
            Update User
          </button>
        </div>
      </form>
    </div>
  );
}
