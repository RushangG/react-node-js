import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ContextProvider from "./components/ContextProvider.tsx";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";

const clientGql = new ApolloClient({
  link: new HttpLink({
    uri: "https://countries.trevorblades.com/graphql",
  }),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
    },
    
  },
});

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={clientGql}>
    <StrictMode>
      <ContextProvider>
        <App />
      </ContextProvider>
    </StrictMode>
  </ApolloProvider>,
);
