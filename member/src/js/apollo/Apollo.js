import React from 'react';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { onError } from 'apollo-link-error';
import { createUploadLink } from 'apollo-upload-client';
import { ApolloLink, split } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { connect } from 'react-redux';
import { AuthLink } from './AuthLink';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

// eslint-disable-next-line
global.API_URL = `${window.location.protocol}//${window.location.hostname}:4000`;

const uploadLink = createUploadLink({
  uri: global.API_URL + '/api',
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true,
    connectionParams: {
      authorization: 'Bearer ' + window.localStorage.getItem('access_token'),
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

export const createApolloClient = (cache = {}) => {
  return new ApolloClient({
    ssrMode: typeof window !== 'undefined',
    cache: new InMemoryCache({
      dataIdFromObject: (obj) => obj.id,
    }).restore(cache),
    link: link,
  });
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

class Apollo extends React.Component {
  render() {
    if (this.props.isAuthenticated) {
      const client = createApolloClient();
      return (
        <ApolloProvider client={client}>{this.props.children}</ApolloProvider>
      );
    } else {
      return this.props.children;
    }
  }
}

export default connect(mapStateToProps)(Apollo);
