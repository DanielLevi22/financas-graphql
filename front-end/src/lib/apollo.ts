import { ApolloClient, InMemoryCache, createHttpLink, from, CombinedGraphQLErrors } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('@financy:token');
  
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const errorLink = onError(({ error }) => {
  if (CombinedGraphQLErrors.is(error)) {
    error.errors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}`
      );
      
      if (message.includes('Not authenticated') || message.includes('Unauthorized')) {
        localStorage.removeItem('@financy:token');
        window.location.href = '/login';
      }
    });
  } else {
    console.error(`[Network error]: ${error}`);
  }
});

export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});
