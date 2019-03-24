import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Divider } from '@material-ui/core';
import LikeCounter from './LikeCounter';
import CommentCounter from './CommentCounter';

import styles from './PostStats.css';

export const POST_STATS = gql`
  query($postId: ID!) {
    post(postId: $postId) {
      comments {
        id
      }
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
    if (!this.props.post) return null;
    const { likedBy, comments } = this.props.post;
    return (
      <div className={styles.container}>
        <div className={styles.bar}>
          <LikeCounter likedBy={likedBy} />
          <CommentCounter
            comments={comments}
            onComment={this.props.onComment}
          />
        </div>
        <Divider />
      </div>
    );
  }
}

export default graphql(POST_STATS, {
  props: ({ data }) => ({ post: data.post }),
})(PostStats);
