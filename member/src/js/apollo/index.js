import React from 'react';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { createUploadLink } from 'apollo-upload-client';
import { onError } from "apollo-link-error";
import { InMemoryCache } from 'apollo-cache-inmemory';
import { connect } from 'react-redux';
import { ApolloLink } from 'apollo-link';

// eslint-disable-next-line
global.API_URL = `${window.location.protocol}//${window.location.hostname}:4000`;

const error_link = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.error(`[Network error]: ${networkError}`);
});

const upload_link = createUploadLink({
  uri: global.API_URL + '/api',
  headers: {
    Authorization: 'Bearer ' + window.localStorage.getItem('access_token'),
  },
});

const link = ApolloLink.from([
  error_link, upload_link
]);

export const createApolloClient = (cache = {}) => {
  return new ApolloClient({
    ssrMode: typeof window !== 'undefined',
    cache: new InMemoryCache().restore(cache),
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
