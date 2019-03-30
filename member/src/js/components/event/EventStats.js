import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { SocialStats } from 'Components';

export const EVENT_STATS = gql`
  query($eventId: ID!) {
    event(eventId: $eventId) {
      likedBy {
        id
        name
        avatar
      }
    }
    eventCommentCount(eventId: $eventId)
  }
`;

class EventStats extends React.Component {
  render() {
    if (!this.props.event) return null;
    const { likedBy } = this.props.event;
    return (
      <SocialStats
        likedBy={likedBy}
        count={this.props.count}
        onComment={this.props.onComment}
      />
    );
  }
}

export default graphql(EVENT_STATS, {
  props: ({ data }) => ({ event: data.event, count: data.eventCommentCount }),
})(EventStats);
