import React from 'react';
import gql from 'graphql-tag';
import { graphql, Mutation } from 'react-apollo';
import { Button } from '@material-ui/core';
import { Icon } from 'Components';
import { EVENT_STATS } from './EventStats';

import styles from './LikeEvent.css';

const USER = gql`
  query {
    currentUser {
      id
      likedEvents {
        id
      }
    }
  }
`;

const LIKE = gql`
  mutation($userId: ID!, $eventId: ID!) {
    likeEvent(userId: $userId, eventId: $eventId) {
      id
    }
  }
`;

const UNLIKE = gql`
  mutation($userId: ID!, $eventId: ID!) {
    unlikeEvent(userId: $userId, eventId: $eventId) {
      id
    }
  }
`;

class LikeEvent extends React.Component {
  onLike = () => {
    this.mutate({
      variables: {
        eventId: this.props.event.id,
        userId: this.props.user.id,
      },
      refetchQueries: () => [
        { query: USER },
        { query: EVENT_STATS, variables: { eventId: this.props.event.id } },
      ],
    });
  };

  checkLiked = () => {
    const { likedEvents } = this.props.user;
    return likedEvents.find((post) => post.id === this.props.event.id) && true;
  };

  render() {
    if (!this.props.user) return null;
    const liked = this.checkLiked();
    const cls = liked ? 'liked' : null;
    return (
      <Mutation mutation={liked ? UNLIKE : LIKE}>
        {(mutate) => {
          this.mutate = mutate;
          return (
            <Button
              size="small"
              className={styles[cls]}
              color="primary"
              onClick={this.onLike}
            >
              <Icon type="like" style={{ marginRight: '5px' }} /> Like
            </Button>
          );
        }}
      </Mutation>
    );
  }
}

export default graphql(USER, {
  props: ({ data }) => ({ user: data.currentUser }),
})(LikeEvent);
