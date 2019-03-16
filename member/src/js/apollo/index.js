import React from 'react';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { createUploadLink } from 'apollo-upload-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { connect } from 'react-redux';

// eslint-disable-next-line
global.API_URL = `${window.location.protocol}//${window.location.hostname}:4000`;

export const createApolloClient = (cache = {}) => {
  return new ApolloClient({
    ssrMode: typeof window !== 'undefined',
    cache: new InMemoryCache().restore(cache),
    link: createUploadLink({
      uri: global.API_URL + '/api',
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('access_token'),
      },
    }),
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
