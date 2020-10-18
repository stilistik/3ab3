import gql from 'graphql-tag';

export const LIKE_POST = gql`
  mutation($userId: ID!, $postId: ID!) {
    likePost(userId: $userId, postId: $postId) {
      id
    }
  }
`;

export const UNLIKE_POST = gql`
  mutation($userId: ID!, $postId: ID!) {
    unlikePost(userId: $userId, postId: $postId) {
      id
    }
  }
`;

export const DELETE_POST = gql`
  mutation($postId: ID!) {
    deletePost(postId: $postId) {
      id
    }
  }
`;
