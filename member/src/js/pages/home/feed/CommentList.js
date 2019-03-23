import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Comment from './Comment';

import styles from './CommentList.css';

const QUERY = gql`
  query($postId: ID!) {
    post(postId: $postId) {
      comments {
        id
        author {
          id
          name
          avatar
        }
        text
        date
      }
    }
  }
`;

class CommentList extends React.Component {
  render() {
    if (!this.props.post) return null;
    const { post } = this.props;
    return (
      <div className={styles.list}>
        {post.comments.map((comment) => {
          return <Comment key={comment.id} comment={comment} />;
        })}
      </div>
    );
  }
}

export default graphql(QUERY, {
  skip: (props) => !props.postId,
  options: (props) => ({ variables: { postId: props.postId } }),
  props: ({ data }) => ({ post: data.post }),
})(CommentList);
