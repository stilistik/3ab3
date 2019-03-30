import React from 'react';
import Comment from './Comment';

import styles from './CommentList.css';

class CommentList extends React.Component {
  render() {
    if (!this.props.comments) return null;
    return (
      <div className={styles.list}>
        {this.props.comments.map((comment) => {
          return <Comment key={comment.id} comment={comment} />;
        })}
      </div>
    );
  }
}

export default CommentList;
