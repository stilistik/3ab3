import gql from 'graphql-tag';

export const CREATE_SECRET = gql`
  mutation($input: CreateSecretInput!) {
    createSecret(input: $input) {
      id
    }
  }
`;
