import React from 'react';
import { Chip } from '@material-ui/core';
import { UserAvatar } from 'Components';
import CommentStats from './CommentStats';

import styles from './Comment.css';

class Comment extends React.Component {
  render() {
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
    return (
      <div className={styles.comment}>
        <Chip
          classes={{ root: styles.chip, label: styles.chiplabel }}
          avatar={avatar}
          label={label}
        />
        <CommentStats />
      </div>
    );
  }
}

export default Comment;
