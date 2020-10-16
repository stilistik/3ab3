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

export const POST_STATS = gql`
  query($postId: ID!) {
    post(postId: $postId) {
      likedBy {
        id
        name
        avatar
      }
    }
    postCommentCount(postId: $postId)
  }
`;

export const POST_COMMENTS = gql`
  query($postId: ID!, $first: Int, $after: String) {
    postComments(postId: $postId, first: $first, after: $after) {
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
          text
          link
          date
        }
      }
    }
  }
`;
