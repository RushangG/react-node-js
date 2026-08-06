import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { getUserData, deleteUser } from "../../api/UserData";
import { type User } from "../../api/UserData";

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  function fetchUsers() {
    const storedUsers = getUserData();
    setUsers(storedUsers);
  }

  function handleAddUser() {
    // Navigate to the UserForm component
    navigate("/UserForm");
  }

  function handleEditUser(userId: number) {
    navigate("/UserForm", { state: { userId: userId } });
    // navigate(`/UserForm/${userId}`);
  }

  function handleDeleteUser(userId: number) {
    deleteUser(userId);
    fetchUsers(); // Refresh the user list after deletion
  }

  console.log("UserList users:", users);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header with button side-by-side */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User List</h1>
        <button
          onClick={handleAddUser}
          className="bg-blue-500 text-white px-4 py-2 rounded text-sm font-medium"
        >
          Add User
        </button>
      </header>

      <main>
        {/* Simple Bordered Table */}
        <table className="w-full border-collapse border border-gray-300 text-left text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-3">No.</th>
              <th className="border border-gray-300 p-3">Name</th>
              <th className="border border-gray-300 p-3">Email</th>
              <th className="border border-gray-300 p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td className="border border-gray-300 p-3">{index + 1}</td>
                <td className="border border-gray-300 p-3">{user.name}</td>
                <td className="border border-gray-300 p-3">{user.email}</td>
                <td className="border border-gray-300 p-3 space-x-4">
                  <button
                    onClick={() => handleEditUser(user.id)}
                    className="text-blue-600 underline font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-red-600 underline font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
