import gql from 'graphql-tag';

export const POST_FEED = gql`
  query($first: Int!, $after: String) {
    feed(first: $first, after: $after) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          author {
            id
            name
            avatar
          }
          date
          text
          image
          link
        }
      }
    }
  }
`;
