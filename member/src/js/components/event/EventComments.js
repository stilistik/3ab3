import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { CommentList } from 'Components';

export const EVENT_COMMENTS = gql`
  query($eventId: ID!) {
    event(eventId: $eventId) {
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
    if (!this.props.event) return null;
    const { event } = this.props;
    return <CommentList comments={event.comments} />;
  }
}

export default graphql(EVENT_COMMENTS, {
  skip: (props) => !props.eventId,
  options: (props) => ({ variables: { eventId: props.eventId } }),
  props: ({ data }) => ({ event: data.event }),
})(PostComments);
