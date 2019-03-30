import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { CommentList } from 'Components';

export const POST_COMMENTS = gql`
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

class PostComments extends React.Component {
  render() {
    if (!this.props.post) return null;
    const { post } = this.props;
    return <CommentList comments={post.comments} />;
  }
}

export default graphql(POST_COMMENTS, {
  skip: (props) => !props.postId,
  options: (props) => ({ variables: { postId: props.postId } }),
  props: ({ data }) => ({ post: data.post }),
})(PostComments);
