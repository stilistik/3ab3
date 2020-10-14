import gql from 'graphql-tag';

export const TOTAL_UNREAD_MESSAGES = gql`
  query {
    currentUser {
      id
      unreadMessages
    }
  }
`;
