import gql from 'graphql-tag';

export const FUTURE_EVENT_FEED = gql`
  query($first: Int!, $after: String) {
    futureEvents(first: $first, after: $after) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          title
          description
          date
          image
        }
      }
    }
  }
`;

export const ALL_EVENTS_FEED = gql`
  query($first: Int!, $after: String) {
    events(first: $first, after: $after) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          title
          description
          date
          image
        }
      }
    }
  }
`;

export const EVENT_STATS = gql`
  query($eventId: ID!) {
    event(eventId: $eventId) {
      id
      likedBy {
        id
        name
        avatar
      }
    }
    eventCommentCount(eventId: $eventId)
  }
`;

export const EVENT_SUPPORT = gql`
  query($eventId: ID!) {
    event(eventId: $eventId) {
      id
      supporters {
        id
      }
    }
  }
`;

export const SINGLE_EVENT = gql`
  query($eventId: ID!) {
    event(eventId: $eventId) {
      id
      todos {
        id
        text
        due
        done
        doneBy {
          id
          avatar
          name
        }
        assigned {
          id
          avatar
          name
        }
        doneAt
      }
    }
  }
`;
