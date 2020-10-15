import gql from 'graphql-tag';

export const CREATE_EVENT = gql`
  mutation($input: EventInput!) {
    createEvent(input: $input) {
      id
    }
  }
`;


export const LIKE_EVENT = gql`
  mutation($userId: ID!, $eventId: ID!) {
    likeEvent(userId: $userId, eventId: $eventId) {
      id
    }
  }
`;

export const UNLIKE_EVENT = gql`
  mutation($userId: ID!, $eventId: ID!) {
    unlikeEvent(userId: $userId, eventId: $eventId) {
      id
    }
  }
`;

export const SUPPORT_EVENT = gql`
  mutation($userId: ID!, $eventId: ID!) {
    supportEvent(userId: $userId, eventId: $eventId) {
      id
    }
  }
`;

export const UNSUPPORT_EVENT = gql`
  mutation($userId: ID!, $eventId: ID!) {
    unsupportEvent(userId: $userId, eventId: $eventId) {
      id
    }
  }
`;
