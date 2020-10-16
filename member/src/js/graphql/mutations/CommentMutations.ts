import gql from 'graphql-tag';

export const LIKE_COMMENT = gql`
  mutation($userId: ID!, $commentId: ID!) {
    likeComment(userId: $userId, commentId: $commentId) {
      id
    }
  }
`;

export const UNLIKE_COMMENT = gql`
  mutation($userId: ID!, $commentId: ID!) {
    unlikeComment(userId: $userId, commentId: $commentId) {
      id
    }
  }
`;
