import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Divider } from '@material-ui/core';

import styles from './CommentStats.css';

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

class PostStats extends React.Component {
  render() {
    if (!this.props.comment) return null;
    const { likedBy } = this.props.comment;
    return (
      <div className={styles.container}>
        <div className={styles.bar}>
          <span>{likedBy.length}</span>
        </div>
        <Divider />
      </div>
    );
  }
}

export default graphql(COMMENT_STATS, {
  skip: (props) => !props.commentId,
  options: (props) => ({ variables: { commentId: props.commentId } }),
  props: ({ data }) => ({ comment: data.comment }),
})(PostStats);
