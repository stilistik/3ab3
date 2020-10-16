import gql from 'graphql-tag';

export const COMMENT_STATS = gql`
  query($commentId: ID!) {
    comment(commentId: $commentId) {
      likedBy {
        id
        name
        avatar
      }
    }
  }
`;
