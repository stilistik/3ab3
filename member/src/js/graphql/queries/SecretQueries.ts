import gql from 'graphql-tag';

export const SECRETS = gql`
  query {
    secrets {
      id
      title
      front
      back
      creator {
        id
        name
      }
    }
  }
`;
