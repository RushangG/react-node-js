import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ContextProvider from "./components/ContextProvider.tsx";
import { ApolloProvider } from "@apollo/client/react";
import { clientGql } from "./Apis/graphql-api/graphql-client.ts";

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={clientGql}>
    <StrictMode>
      <ContextProvider>
        <App />
      </ContextProvider>
    </StrictMode>
  </ApolloProvider>,
);
