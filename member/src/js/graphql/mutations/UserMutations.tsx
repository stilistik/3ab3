import gql from 'graphql-tag';

export const EDIT_SELF = gql`
  mutation($input: EditSelfInput!) {
    editSelf(input: $input) {
      id
    }
  }
`;

export const EDIT_USER = gql`
  mutation($userId: ID!, $input: UserInput!) {
    editUser(userId: $userId, input: $input) {
      id
    }
  }
`;

export const CREATE_USER = gql`
  mutation($input: UserInput!) {
    createUser(input: $input) {
      id
    }
  }
`;

export const DELETE_USER = gql`
  mutation($userId: ID!) {
    deleteUser(userId: $userId) {
      id
    }
  }
`;
