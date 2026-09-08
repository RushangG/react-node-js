import { useState, useEffect } from "react";
import { getUsers, deleteUser } from "../../Apis/user-api";
import { useNavigate } from "react-router-dom";
export default function UserList() {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();
  
  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const data = await getUsers();
    setUsers(data);
    console.log("response", data);
  }

  async function handleUpdate(userId: string) {
    // Implementation for updating a user
    navigate("/user-update", { state: {  userId } });
  }

  async function handleDelete(userId: string) {
    // Implementation for deleting a user
    if (confirm("Are you sure want to delete this user ? ")) {
      await deleteUser(Number(userId));
      fetchUsers(); // Refresh the user list after deletion
    }
  }

  return (
    <div>
      <h1>User List</h1>

      <span className="flex justify-end mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => navigate("/user-role")}
        >
          Assign Role
        </button>
      </span>

      <table className="table-auto border-collapse border border-gray-400">
        <thead>
          <tr>
            <th> Name</th>
            <th> Email</th>
            <th>Count of Products </th>
            <th>Roles</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user.id}>
              <td className="border border-gray-300 px-4 py-2">{user.name}</td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <th className="border border-gray-300 px-4 py-2">
                {user.products.length}
              </th>
              <th className="border border-gray-300 px-4 py-2">
                {user.roles.map((role: any) => (
                  <span key={role.id}> {role.name} , </span>
                ))}
              </th>
              <th className="border border-gray-300 px-4 py-2">
                <button
                  className="bg-green-400 text-white px-4 py-2 rounded mr-2 cursor-pointer"
                  onClick={() => handleUpdate(user.id)}
                >
                  Update
                </button>
                <button
                  className="bg-red-400 text-white px-4 py-2 rounded cursor-pointer"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
