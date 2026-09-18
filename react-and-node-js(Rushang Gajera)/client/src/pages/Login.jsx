import { useState } from "react";
import "../App.css";
import { LoginUser } from "../api/auth";
import { useAuth } from "../pages/ContextProvider";

export default function Login() {

  const { Login, isLoading } = useAuth();
const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  function handleOnChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();


  setError("");
  try {
    await Login(
      formData.username,
      formData.password
    );
   
  } catch (error) {

    setError(
      error.response?.data?.message ||
      "Login failed"
    );

  }

    setFormData({
      username: "",
      password: "",
    });
  }

  return (
    <>
      <div>
        <h1>Login Form</h1>
        <form onSubmit={handleSubmit} id="center">
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleOnChange}
            placeholder="Enter User Name"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleOnChange}
            placeholder="Enter Email"
            required
          />


          {error && (
            <p style={{ color: "red" }}>
              {error}
            </p>
          )}

          <button type="submit"> Submit </button>
        </form>
      </div>
    </>
  );
}
