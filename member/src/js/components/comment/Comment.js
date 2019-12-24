import React from 'react';
import { Chip } from '@material-ui/core';
import { UserAvatar } from 'Components';
import CommentActions from './CommentActions';

import styles from './Comment.less';

const Comment = ({ comment }) => {
  return (
    <div className={styles.comment}>
      <div className={styles.content}>
        <UserAvatar user={comment.author} classes={{ avatar: styles.avatar }} />
        <div className={styles.text}>
          <span className={styles.user}>{comment.author.name}</span>
          <span>{comment.text}</span>
        </div>
      </div>
      <CommentActions comment={comment} />
    </div>
  );
};

export default Comment;
