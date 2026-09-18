
import axios from 'axios';


const BASE_URL = "http://localhost:4000/api";
const apiClient = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

let accessToken = null;
let refreshToken = localStorage.getItem("refreshToken") || null;


export function setAccessToken (token)  {
  accessToken = token;
};

export function getAccessToken() {
  return accessToken;
};

export function setTokens(accessToken, refreshToken) {

    accessToken = accessToken;
    refreshToken = refreshToken;
    if(refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
    }
    else{
        localStorage.removeItem("refreshToken");
    }
}

export function clearTokens() {
    accessToken = null;
    refreshToken = null;
    localStorage.removeItem("refreshToken");
}

apiClient.interceptors.request.use(function
    (config) {
    let token = JSON.parse(localStorage.getItem("token"));
    console.log(token);
    let accessToken = token.accessToken;

    config.headers.Authorization = `Bearer ${accessToken}`
    return config;
},
    function (errr) {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
        // stop the infinite loop of retrying the request of 401 to refresh token.
  
      originalRequest._retry = true;

      try {

        const response = await axios.post(
          "http://localhost:4000/api/auth/refresh",
          {
            refreshToken: getRefreshToken(),
          }
        );

        const newAccessToken =
          response.data.accessToken;

        setAccessToken(newAccessToken);

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return axiosClient(originalRequest);

      } catch (refreshError) {

        clearTokens();

        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;