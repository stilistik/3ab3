import gql from 'graphql-tag';

export const CREATE_SECRET = gql`
  mutation($input: SecretInput!) {
    createSecret(input: $input) {
      id
    }
  }
`;

export const EDIT_SECRET = gql`
  mutation($secretId: ID!, $input: SecretInput!) {
    editSecret(secretId: $secretId, input: $input) {
      id
    }
  }
`;

export const DELETE_SECRET = gql`
  mutation($secretId: ID!) {
    deleteSecret(secretId: $secretId) {
      id
    }
  }
`;
