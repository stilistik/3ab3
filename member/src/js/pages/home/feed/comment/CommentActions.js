import React from 'react';
import gql from 'graphql-tag';
import { graphql, Mutation } from 'react-apollo';
import CommentStats, { COMMENT_STATS } from './CommentStats';

import styles from './CommentActions.css';

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

class CommentActions extends React.Component {
  onClick = () => {
    this.mutate({
      variables: {
        userId: this.props.user.id,
        commentId: this.props.comment.id,
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
    if (!this.props.user || !this.props.comment) return null;
    const { comment } = this.props;
    const liked = this.checkLiked();
    return (
      <Mutation mutation={liked ? UNLIKE : LIKE}>
        {(mutate) => {
          this.mutate = mutate;
          return (
            <div>
              <CommentStats commentId={comment.id} />
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default graphql(USER, {
  props: ({ data }) => ({ user: data.currentUser }),
})(CommentActions);
