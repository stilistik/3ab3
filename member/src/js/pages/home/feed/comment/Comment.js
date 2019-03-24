import React from 'react';
import { Chip } from '@material-ui/core';
import { UserAvatar } from 'Components';
import gql from 'graphql-tag';
import { graphql, Mutation } from 'react-apollo';
import CommentStats from './CommentStats';

import styles from './Comment.css';

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

class Comment extends React.Component {
  onClick = () => {
    this.mutate({
      variables: {
        userId: this.props.user.id,
        commentId: this.props.comment.id,
      },
      refetchQueries: () => [{ query: USER }],
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
    const { comment } = this.props;
    const avatar = (
      <UserAvatar user={comment.author} className={styles.avatar} />
    );
    const label = (
      <div className={styles.label}>
        <span className={styles.user}>{comment.author.name}</span>
        <span className={styles.text}>{comment.text}</span>
      </div>
    );

    const liked = this.checkLiked();
    return (
      <Mutation mutation={liked ? UNLIKE : LIKE}>
        {(mutate) => {
          this.mutate = mutate;
          return (
            <div className={styles.comment}>
              <Chip
                onClick={this.onClick}
                classes={{ root: styles.chip, label: styles.chiplabel }}
                avatar={avatar}
                label={label}
              />
              <CommentStats />
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default graphql(USER, {
  props: ({ data }) => ({ user: data.currentUser }),
})(Comment);
