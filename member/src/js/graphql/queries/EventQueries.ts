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