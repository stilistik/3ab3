import React from 'react';
import { graphql } from 'react-apollo';
import { LikeCounter } from 'Components';
import { COMMENT_STATS } from 'Graphql/queries';

class CommentStats extends React.Component {
  render() {
    if (!this.props.comment) return null;
    const { likedBy } = this.props.comment;
    return <LikeCounter likedBy={likedBy} />;
  }
}

export default graphql(COMMENT_STATS, {
  skip: (props) => !props.commentId,
  options: (props) => ({ variables: { commentId: props.commentId } }),
  props: ({ data }) => ({ comment: data.comment }),
})(CommentStats);
