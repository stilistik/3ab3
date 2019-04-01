import React from 'react';
import { DefaultGrid } from 'Components';
import { Grid } from '@material-ui/core';
import CreateCommittee from './committee/CreateCommittee';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { getQueryParams } from 'History';

import styles from './EditEvent.css';

const EVENT = gql`
  query($eventId: ID!) {
    event(eventId: $eventId) {
      id
      committee {
        id
      }
    }
  }
`;

class EditEvent extends React.Component {
  render() {
    if (!this.props.event) return null;
    const { event } = this.props;
    return (
      <DefaultGrid overflow>
        <div className={styles.container}>
          <Grid container spacing={24}>
            <Grid item xs={12} md={6}>
              <CreateCommittee committee={event.committee} />
            </Grid>
          </Grid>
        </div>
      </DefaultGrid>
    );
  }
}

export default graphql(EVENT, {
  props: ({ data }) => ({ event: data.event }),
  options: () => ({ variables: { eventId: getQueryParams().id } }),
})(EditEvent);
