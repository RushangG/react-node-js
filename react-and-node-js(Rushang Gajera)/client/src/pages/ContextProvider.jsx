import { createContext, useContext, useEffect, useState } from "react";
import { setTokens, clearTokens } from "../api/axiosClient";

import { LoginUser } from "../api/auth";
import { getRefreshToken } from "../api/axiosClient";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
const AuthContext = createContext();

export default function ContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

  // async function RefreshTokenData() {
  //   let refreshToken = getRefreshToken();
  //   setIsLoading(true);
  //   try {
  //     const data = await axios.post("http://localhost:4000/api/auth/refresh", {
  //       refreshToken: getRefreshToken(),
  //     });

  //     console.log("Login response:", data.data);

  //     let decodeData = jwtDecode(data.data.accessToken);
  //     let payload = {
  //       userId: decodeData.userId,
  //       username: decodeData.username,
  //       role: decodeData.role,
  //     };
  //     setUser(payload);
  //     setTokens(data.data.accessToken, refreshToken);
  //     setAccessToken(data.data.accessToken);

  //     setIsAuth(true);
  //     return data;
  //   } catch (error) {
  //     throw error;
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  // useEffect(() => {
  //   RefreshTokenData();
  // }, []);

  async function Login(username, password) {
    setIsLoading(true);
    try {
      const data = await LoginUser(username, password);
      console.log("Login response:", data);

      setUser(data.payload);
      setTokens(data.accessToken, data.refreshToken);
      setAccessToken(data.accessToken);

      setIsAuth(true);
      return data;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  function Logout() {
    setUser(null);
    setIsAuth(false);
    clearTokens();
    setAccessToken(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth,
        isLoading,
        accessToken,
        Login,
        Logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("context not provided");
  }

  return context;
}
