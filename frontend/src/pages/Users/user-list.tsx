import { useState, useEffect } from "react";
import { getUsers } from "../../Apis/user-api";

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const data = await getUsers();
    setUsers(data);
    console.log("response", data);
  }
  return (
    <div>
      <h1>User List</h1>

      <table className="table-auto border-collapse border border-gray-400">
        <thead>
          <tr>
            <th> Name</th>
            <th> Email</th>
            <th>Count of Products  </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user.id}>
              <td className="border border-gray-300 px-4 py-2">{user.name}</td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <th className="border border-gray-300 px-4 py-2">{user.products.length}</th>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
