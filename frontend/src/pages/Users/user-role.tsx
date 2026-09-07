import { useState, useEffect } from "react";
import { getRoles } from "../../Apis/role-api";
import { getUsers } from "../../Apis/user-api";
import { assignRoleToUser } from "../../Apis/user-api";
export default function UserRole() {
  useEffect(() => {
    fetchRoles();
    fetchUsers();
  }, []);

  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);

  async function fetchRoles() {
    const data = await getRoles();
    setRoles(data);
  }

  async function fetchUsers() {
    const data = await getUsers();
    setUsers(data);
  }

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    // Handle form submission

    let userId = e.target.user.value;
    let roleId = e.target.roles.value;
    console.log("userId", userId);
    console.log("roleId", roleId);
    const res = await assignRoleToUser(
      e.target.user.value,
      e.target.roles.value,
    );

    console.log(res);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User Role</h1>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-raw gap-4">
          <div className="mb-4">
            <label className="font-bold" htmlFor="user">
              User:
            </label>
            <select
              className="border border-gray-300 rounded-md p-2"
              name="user"
              id="user"
            >
              {users.map((user: any) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="font-bold" htmlFor="roles">
              Roles:
            </label>
            <select
              className="border border-gray-300 rounded-md p-2"
              name="roles"
              id="roles"
            >
              {roles.map((roles: any) => (
                <option key={roles.id} value={roles.id}>
                  {roles.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          className="bg-blue-500 text-white my-8 px-4 py-2 rounded"
          type="submit"
        >
          Assign Role
        </button>
      </form>
    </div>
  );
}
