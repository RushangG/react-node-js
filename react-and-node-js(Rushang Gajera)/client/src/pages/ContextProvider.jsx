import { createContext, useContext, useState } from "react";
import {
  setTokens,
  clearTokens,
} from "../api/axiosClient";

import { LoginUser } from "../api/auth";
const AuthContext = createContext();

export default function ContextProvider({ children }) {

  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

  async function Login(username, password) {
    setIsLoading(true);
    try {
      const data = await LoginUser(
        username,
        password
      );
      console.log("Login response:", data);
      setUser(data.user);
      setTokens(
        data.accessToken,
        data.refreshToken
      );

      setAccessToken(
        data.accessToken
      );

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
    setAccessToken(null);
    clearTokens();

  }


  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth,
        accessToken,
        isLoading,
        Login,
        Logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {

  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "context not provided"
    );
  }

  return context;
}