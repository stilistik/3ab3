import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Divider, Avatar } from '@material-ui/core';
import { Icon } from 'Components';

import styles from './StatsBar.css';

export const STATS = gql`
  query($postId: ID!) {
    post(postId: $postId) {
      comments {
        id
      }
      likedBy {
        id
      }
    }
  }
`;

class StatsBar extends React.Component {
  render() {
    if (!this.props.post) return null;
    const { likedBy, comments } = this.props.post;
    return (
      <div className={styles.container}>
        <div className={styles.bar}>
          <div className={styles.stats}>
            <Avatar className={styles.circle}>
              <Icon type="like" className={styles.icon} />
            </Avatar>
            <span>{likedBy.length}</span>
          </div>
          <div className={styles.stats}>
            <Avatar className={styles.circle}>
              <Icon type="comment" className={styles.icon} />
            </Avatar>
            <span>{comments.length}</span>
          </div>
        </div>
        <Divider />
      </div>
    );
  }
}

export default graphql(STATS, {
  props: ({ data }) => ({ post: data.post }),
})(StatsBar);
