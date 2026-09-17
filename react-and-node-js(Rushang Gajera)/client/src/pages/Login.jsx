import { useState } from "react";
import "../App.css";
import { LoginUser } from "../api/auth";

export default function Login() {
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

    let username = formData.username;
    let password = formData.password;

    let data = await LoginUser(username, password);
    console.log("login", data);

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

          <button type="submit"> Submit </button>
        </form>
      </div>
    </>
  );
}
