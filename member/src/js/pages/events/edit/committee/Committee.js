import React from 'react';
import { Grid } from '@material-ui/core';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import CreateCommittee from './CreateCommittee';
import ListCommittee from './ListCommittee';

export const COMMITTEE = gql`
  query($eventId: ID!) {
    event(eventId: $eventId) {
      id
      committee {
        id
        creator {
          id
          avatar
          name
        }
        members {
          id
          avatar
          name
        }
      }
    }
  }
`;

class Committee extends React.Component {
  render() {
    const { event } = this.props;
    if (!event) return null;
    return (
      <Grid container spacing={24}>
        <Grid item xs={12} md={6}>
          <CreateCommittee committee={event.committee} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ListCommittee committee={event.committee} />
        </Grid>
      </Grid>
    );
  }
}

export default graphql(COMMITTEE, {
  props: ({ data }) => ({ event: data.event }),
  options: (props) => ({ variables: { eventId: props.eventId } }),
})(Committee);
