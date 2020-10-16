import React from 'react';
import { graphql } from 'react-apollo';
import { SocialStats } from 'Components';
import { POST_STATS } from 'Graphql/queries';

class PostStats extends React.Component {
  render() {
    if (!this.props.post) return null;
    const { likedBy } = this.props.post;
    return (
      <SocialStats
        likedBy={likedBy}
        count={this.props.count}
        onComment={this.props.onComment}
      />
    );
  }
}

export default graphql(POST_STATS, {
  props: ({ data }) => ({ post: data.post, count: data.postCommentCount }),
})(PostStats);
