import axios from "axios";
import router from "../routes";
const BASE_URL = "http://localhost:3000";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Include credentials (cookies) in requests
});

export default apiClient;

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401) {
      // Handle unauthorized error (e.g., redirect to login page)

      try {
        // Attempt to refresh the token
        const refreshToken = await axios.post(
          `${BASE_URL}/auth/refresh-token`,
          {},
          {
            withCredentials: true, // Include credentials (cookies) in requests
          },
        );

        const newToken = refreshToken.data.accessToken;

        localStorage.setItem("authToken", newToken);
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

        return apiClient(originalRequest); // Retry the original request with the new token
      } catch (refreshError) {
        localStorage.removeItem("authToken");
        // Redirect to login page
        router.navigate("/login"); // Assuming you have a redirect function to redirect
        console.error("Unauthorized access - redirecting to login.");

        return Promise.reject(refreshError);
      }
    }

    // return Promise.reject(error);
  },
);
