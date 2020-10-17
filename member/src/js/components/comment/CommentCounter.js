import React from 'react';
import { Avatar, Typography } from '@material-ui/core';
import { Icon } from 'Components';

import styles from './CommentCounter.css';

const CommentCounter = ({ count, onComment }) => {
  return (
    <div className={styles.stats}>
      <Avatar className={styles.circle} onClick={onComment}>
        <Icon type="comment" className={styles.icon} />
      </Avatar>
      <Typography variant="body2" color="textPrimary" style={{ fontSize: 11 }}>
        {count}
      </Typography>
    </div>
  );
};

export default CommentCounter;
