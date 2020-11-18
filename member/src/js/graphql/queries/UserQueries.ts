import gql from 'graphql-tag';

const USER_FIELDS = gql`
  fragment UserFields on User {
    id
    name
    firstName
    lastName
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

export const CURRENT_USER_BALANCE = gql`
  query {
    currentUser {
      id
      balance
    }
  }
`;

export const CURRENT_USER_SUPPORTED_EVENTS = gql`
  query {
    currentUser {
      id
      supportedEvents {
        id
      }
    }
  }
`;

export const CURRENT_USER_LIKED_EVENTS = gql`
  query {
    currentUser {
      id
      likedEvents {
        id
      }
    }
  }
`;

export const CURRENT_USER_LIKED_COMMENTS = gql`
  query {
    currentUser {
      id
      likedComments {
        id
      }
    }
  }
`;


export const CURRENT_USER_LIKED_POSTS = gql`
  query {
    currentUser {
      id
      likedPosts {
        id
      }
    }
  }
`;
