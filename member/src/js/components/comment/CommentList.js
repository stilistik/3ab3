import React from 'react';
import Comment from './Comment';
import { Button } from '@material-ui/core';

import styles from './CommentList.css';

class CommentList extends React.Component {
  render() {
    if (!this.props.comments) return null;
    return (
      <div className={styles.list}>
        {this.props.comments.map((comment) => {
          return <Comment key={comment.id} comment={comment} />;
        })}
        {this.props.hasNext ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              size="small"
              onClick={() => this.props.more(this.props.cursor)}
            >
              More
            </Button>
          </div>
        ) : null}
      </div>
    );
  }
}

export default CommentList;
