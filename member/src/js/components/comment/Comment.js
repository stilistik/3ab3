import React from 'react';
import { Chip } from '@material-ui/core';
import { UserAvatar } from 'Components';
import CommentActions from './CommentActions';

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
          onClick={this.onClick}
          classes={{ root: styles.chip, label: styles.chiplabel }}
          avatar={avatar}
          label={label}
        />
        <CommentActions comment={comment} />
      </div>
    );
  }
}

export default Comment;
