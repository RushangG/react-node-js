import React, { useState } from "react";
import { register } from "../../Apis/auth-api";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const userData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    let result = await register(userData);

    if (result) {
    alert("Registration successful! Please log in.");
    navigate("/login");
    } else {
      alert("Registration failed. Please try again.");
    }
  }

  return (
    <div className="bg-white-100 min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-4">Register Page</h1>
        <div className="flex flex-col gap-4">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            required
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your password"
            required
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <button type="submit" className="border bg-green-400 rounded">
            Register
          </button>
        </div>

        <p>
          <button
            className="text-blue-500 hover:underline m-2"
            onClick={() => navigate("/login")}
          >
            Login{" "}
          </button>
          Already have an account? Login
        </p>
      </form>
    </div>
  );
}
