import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export const clientGql = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:3000/graphql",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  }),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "network-only",
    },
    query: {
      fetchPolicy: "network-only",
    },
  },
});
