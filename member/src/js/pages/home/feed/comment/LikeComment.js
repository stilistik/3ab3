import React from 'react';
import gql from 'graphql-tag';
import { graphql, Mutation } from 'react-apollo';
import { Link } from '@material-ui/core';
import { COMMENT_STATS } from './CommentStats';

import styles from './LikeComment.css';

const USER = gql`
  query {
    currentUser {
      id
      likedComments {
        id
      }
    }
  }
`;

const LIKE = gql`
  mutation($userId: ID!, $commentId: ID!) {
    likeComment(userId: $userId, commentId: $commentId) {
      id
    }
  }
`;

const UNLIKE = gql`
  mutation($userId: ID!, $commentId: ID!) {
    unlikeComment(userId: $userId, commentId: $commentId) {
      id
    }
  }
`;

class LikePost extends React.Component {
  onLike = () => {
    this.mutate({
      variables: {
        commentId: this.props.comment.id,
        userId: this.props.user.id,
      },
      refetchQueries: () => [
        { query: USER },
        {
          query: COMMENT_STATS,
          variables: { commentId: this.props.comment.id },
        },
      ],
    });
  };

  checkLiked = () => {
    const { likedComments } = this.props.user;
    return (
      likedComments.find((comment) => comment.id === this.props.comment.id) &&
      true
    );
  };

  render() {
    if (!this.props.user) return null;
    const liked = this.checkLiked();
    return (
      <Mutation mutation={liked ? UNLIKE : LIKE}>
        {(mutate) => {
          this.mutate = mutate;
          return (
            <Link
              component="button"
              variant="body2"
              onClick={this.onLike}
              className={styles.link}
            >
              {liked ? 'Unlike' : 'Like'}
            </Link>
          );
        }}
      </Mutation>
    );
  }
}

export default graphql(USER, {
  props: ({ data }) => ({ user: data.currentUser }),
})(LikePost);
