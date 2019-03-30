import React from 'react';
import LikeComment from './LikeComment';
import CommentStats from './CommentStats';

import styles from './CommentActions.css';

class CommentActions extends React.Component {
  render() {
    const { comment } = this.props;
    return (
      <div className={styles.actions}>
        <CommentStats commentId={comment.id} />
        <LikeComment comment={comment} />
      </div>
    );
  }
}

export default CommentActions;
