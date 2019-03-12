import { ApolloClient } from 'apollo-client';
import { createUploadLink } from 'apollo-upload-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

// eslint-disable-next-line
global.API_URL = 'http://localhost:4000';

const createApolloClient = (cache = {}) => {
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

const client = createApolloClient();

export default client;
