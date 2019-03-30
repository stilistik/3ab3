import React from 'react';
import { Divider } from '@material-ui/core';
import { LikeCounter, CommentCounter } from 'Components';

import styles from './SocialStats.css';

export const SocialStats = ({ likedBy, comments, onComment }) => {
  return (
    <div className={styles.container}>
      <div className={styles.bar}>
        <LikeCounter likedBy={likedBy} />
        <CommentCounter comments={comments} onComment={onComment} />
      </div>
      <Divider />
    </div>
  );
};
