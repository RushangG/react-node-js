import {
  ApolloClient,
  CombinedGraphQLErrors,
  CombinedProtocolErrors,
  HttpLink,
  InMemoryCache,
  ServerError,
} from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";
import { ErrorLink } from "@apollo/client/link/error";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

const httpLink = new HttpLink({
  uri: `${BASE_URL}/graphql`,
});

const authLink = new SetContextLink((headers) => {
  const token = localStorage.getItem("authToken");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const resetTokenLink = new ErrorLink(({ error, operation, forward }) => {
  if (CombinedGraphQLErrors.is(error)) {
    error.errors.forEach(({ message, locations, extensions }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: Object: ${JSON.stringify(extensions?.originalError)}`,
      ),
    );
    let refreshToken = Promise.resolve(
      axios.post(
        `${BASE_URL}/api/v1/auth/refresh-token`,
        {},
        {
          withCredentials: true,
        },
      ),
    );
    refreshToken.then((response) => {
      const newToken = response.data.accessToken;
      localStorage.setItem("authToken", newToken);
      console.log("Token refreshed successfully:", newToken);

      operation.setContext(({ headers = {} }) => ({
        headers: {
          ...headers,
          authorization: `Bearer ${newToken}`,
        },
      }));
      return forward(operation);
    });
  }
});

export const clientGql = new ApolloClient({
  link: resetTokenLink.concat(authLink).concat(httpLink),
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
