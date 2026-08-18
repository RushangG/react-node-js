import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { addUserData, updateUserData, getUserData } from "../../api/UserData";
import { type User } from "../../api/UserData";
// import { useParams } from "react-router-dom";

export default function UserForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const editId = location.state?.userId;

 

  //   const { userId } = useParams<{ userId: string }>();
  //   let editId = userId ? Number(userId) : undefined;

  console.log("UserForm editId:", editId);
  let title = editId ? "Edit User" : "Add User";
  let buttonText = editId ? "Update User" : "Add User";

  useEffect(() => {
    if (editId) {
      const storedUsers: User[] = getUserData();

      const user = storedUsers.find((user) => user.id === editId);
      console.log("UserForm user:", user);
      if (user) {
        setFormData({ name: user.name, email: user.email });
      }
    }
  }, [editId]);

  const [FormData, setFormData] = useState({
    name: "" as string,
    email: "" as string,
  });

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("FormData:", FormData);

    if (editId) {
      updateUserData(editId, FormData.name, FormData.email);
    } else {
      addUserData(FormData.name, FormData.email);
    }
    setFormData({ name: "", email: "" });
    navigate("/UserList");
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...FormData, [e.target.name]: e.target.value });
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {title}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter name..."
            value={FormData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter email..."
            value={FormData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition dynamic-shadow-sm cursor-pointer"
        >
          {buttonText}
        </button>
      </form>
    </div>
  );
}
