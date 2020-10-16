import gql from 'graphql-tag';

export const CREATE_EVENT = gql`
  mutation($input: EventInput!) {
    createEvent(input: $input) {
      id
    }
  }
`;

export const EDIT_EVENT = gql`
  mutation($eventId: ID!, $input: EventInput!) {
    editEvent(eventId: $eventId, input: $input) {
      id
    }
  }
`;

export const ADD_COMMITTEE_MEMBERS = gql`
  mutation($eventId: ID!, $memberIds: [ID!]!) {
    addCommitteeMembers(eventId: $eventId, memberIds: $memberIds) {
      id
    }
  }
`;

export const REMOVE_COMMITTEE_MEMBER = gql`
  mutation($eventId: ID!, $memberId: ID!) {
    removeCommitteeMember(eventId: $eventId, memberId: $memberId) {
      id
    }
  }
`;

export const SET_EVENT_PUBLISHED = gql`
  mutation($eventId: ID!, $published: Boolean!) {
    setEventPublished(eventId: $eventId, published: $published) {
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
