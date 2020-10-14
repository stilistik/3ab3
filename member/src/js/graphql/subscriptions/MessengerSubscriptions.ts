import gql from 'graphql-tag';

export const NEW_MESSAGES_SUBSCRIPTION = gql`
  subscription($toId: ID!) {
    onNewMessage(toId: $toId) {
      node {
        id
        date
        from {
          id
        }
        chat {
          id
          lastSeen
        }
      }
    }
  }
`;
