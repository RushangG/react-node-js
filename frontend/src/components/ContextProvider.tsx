import React, { createContext, useState, useEffect, useContext } from "react";
import apiClient from "../Apis/api-client";

interface user {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AuthContextProps {
  isAuthenticated: boolean;
  user: user | null;
  login: (user: user) => void;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
  loading: true,
});

export default function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<user | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      fetchUser();
    } else {
      setIsAuthenticated(false);
      setLoading(false);
    }

    async function fetchUser() {
      let user = await apiClient.get("/auth/verify-token");
      console.log("user from token", user.data.user);
      setUser(user.data.user);
      setIsAuthenticated(true);
      setLoading(false);
    }
  }, []);

  const login = (user: user) => {
    setUser(user);
    setIsAuthenticated(true);
    setLoading(false);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
