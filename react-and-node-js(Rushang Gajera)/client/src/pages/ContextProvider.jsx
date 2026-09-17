import { createContext, useContext, useState } from "react";

const AuthContext = createContext();
export default function ContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function Login(data) {
    setUser(data.user);
    setAccessToken(data.accessToken);
    setRefreshToken(data.refreshToken);
    setIsAuth(true);
  }

  function Logout() {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    setIsAuth(false);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        refreshToken,
        isAuth,
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
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("context not provided");
  }

  return context;
}
