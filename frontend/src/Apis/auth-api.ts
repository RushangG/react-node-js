import apiClient from "./api-client";

export interface userReq {
  name?: string;
  email: string;
  password: string;
}

export async function login(req: userReq) {
  try {
    const res = await apiClient.post("/auth/login", {
      email: req.email,
      password: req.password,
    });

    console.log("response", res);
    console.log("login response", res.data);

    localStorage.setItem("authToken", res.data.token);
    return res.data.token;
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
}

export async function register(req: userReq) {
  try {
    const res = await apiClient.post("auth/register", {
      name: req.name,
      email: req.email,
      password: req.password,
    });
    console.log("response", res);
    console.log("register response", res.data);
    return res.data;
  } catch (error) {
    console.error("Register error:", error);
    return null;
  }
}

export async function logout() {
  try {
    localStorage.removeItem("authToken");
    return true;
  } catch (error) {
    console.error("Logout error:", error);
    return false;
  }
}
