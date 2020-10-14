import gql from 'graphql-tag';

const USER_FIELDS = gql`
  fragment UserFields on User {
    id
    name
    role
    email
    avatar
    phone
    birthdate
  }
`;

export const CURRENT_USER_QUERY = gql`
  query {
    currentUser {
      ...UserFields
    }
  }
  ${USER_FIELDS}
`;

export const SINGLE_USER = gql`
  query($userId: ID!) {
    user(userId: $userId) {
      ...UserFields
    }
  }
  ${USER_FIELDS}
`;

export const USER_LIST = gql`
  query {
    users {
      ...UserFields
    }
  }
  ${USER_FIELDS}
`;

