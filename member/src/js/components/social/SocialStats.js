import React from 'react';
import { Divider } from '@material-ui/core';
import { LikeCounter, CommentCounter } from 'Components';

import styles from './SocialStats.css';

const SocialStats = ({ likedBy, count, onComment }) => {
  return (
    <div className={styles.container}>
      <div className={styles.bar}>
        <LikeCounter likedBy={likedBy} />
        <CommentCounter count={count} onComment={onComment} />
      </div>
      <Divider />
    </div>
  );
};

export default SocialStats;
