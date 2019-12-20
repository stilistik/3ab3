import React from 'react';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { onError } from 'apollo-link-error';
import { createUploadLink } from 'apollo-upload-client';
import { ApolloLink, split } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { AuthLink } from './AuthLink';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

// eslint-disable-next-line
global.API_URL = `${window.location.protocol}//${window.location.hostname}:4000`;

const getToken = () => {
  return new Promise((resolve, reject) => {
    const token = window.localStorage.getItem('access_token');
    if (token) resolve(token);
    else reject(null);
  });
};

const uploadLink = createUploadLink({
  uri: global.API_URL + '/api',
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true,
    connectionParams: async () => {
      const token = await getToken();
      return {
        Authorization: token ? `Bearer ${token}` : '',
      };
    },
  },
});

const terminatingLink = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  uploadLink
);

const authLink = new AuthLink();

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, response }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        // eslint-disable-next-line no-console
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    if (networkError) {
      // eslint-disable-next-line no-console
      console.error(
        `[Network error]: ${networkError} on operation: ${operation.operationName}. Response: ${response}`
      );
    }
  }
);

const link = ApolloLink.from([errorLink, authLink, terminatingLink]);

const createApolloClient = (cache = {}) => {
  return new ApolloClient({
    ssrMode: typeof window !== 'undefined',
    cache: new InMemoryCache({
      dataIdFromObject: (obj) => obj.id,
    }).restore(cache),
    link: link,
  });
};

const client = createApolloClient();

const Apollo = ({ children }) => {
  React.useEffect(() => {
    wsLink.subscriptionClient.client.onopen();
    console.log('[Apollo]: initialized');
    return () => {
      console.log('[Apollo] initialized');
      wsLink.subscriptionClient.client.onclose();
    };
  }, []);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Apollo;
