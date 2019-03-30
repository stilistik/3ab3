import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { SocialStats } from 'Components';

export const POST_STATS = gql`
  query($postId: ID!) {
    post(postId: $postId) {
      comments {
        id
      }
      likedBy {
        id
        name
        avatar
      }
    }
  }
`;

class PostStats extends React.Component {
  render() {
    if (!this.props.post) return null;
    const { likedBy, comments } = this.props.post;
    return (
      <SocialStats
        likedBy={likedBy}
        comments={comments}
        onComment={this.props.onComment}
      />
    );
  }
}

export default graphql(POST_STATS, {
  props: ({ data }) => ({ post: data.post }),
})(PostStats);