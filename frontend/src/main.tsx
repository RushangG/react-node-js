import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ContextProvider, { AuthContext } from "./components/ContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContext.Provider
      value={{
        isAuthenticated: !!localStorage.getItem("authToken"),
        user: null,
        login: () => {},
        logout: () => {},
      }}
    >
      <App />
    </AuthContext.Provider>
  </StrictMode>,
);
