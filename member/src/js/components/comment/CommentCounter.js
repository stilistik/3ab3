import React from 'react';
import { Avatar } from '@material-ui/core';
import { Icon } from 'Components';

import styles from './CommentCounter.css';

const CommentCounter = ({ count, onComment }) => {
  return (
    <div className={styles.stats}>
      <Avatar className={styles.circle} onClick={onComment}>
        <Icon type="comment" className={styles.icon} />
      </Avatar>
      <span className={styles.number}>{count}</span>
    </div>
  );
};

export default CommentCounter;
