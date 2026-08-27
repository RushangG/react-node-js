import { useState, useEffect } from "react";
import { login, type userReq } from "../../Apis/auth-api";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [formData, setFormData] = useState<userReq>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    let token = await login(formData);
    if (token) {
      console.log("Login successful, token:", token);
      navigate("/ProductsList");
    } else {
      console.log("Login failed");
    }
  }

  return (
    <div className="bg-white-100 min-h-screen flex  items-center justify-center">
      <form onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-4">Login Page</h1>
        <div className="flex flex-col gap-4">
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

          <button type="submit" className="border bg-green-400 rounded">
            Login
          </button>

          <div>
            <p>
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/register")}
                className="text-blue-500 hover:underline"
              >
                Register
              </button>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
