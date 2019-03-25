import React from 'react';
import { Grid } from '@material-ui/core';
import { EventCard } from 'Components';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import styles from './Events.css';

export const EVENTS = gql`
  query {
    events {
      id
      title
      description
      date
      image
    }
  }
`;

class Events extends React.Component {
  render() {
    if (!this.props.events) return null;
    console.log(this.props);
    return (
      <div className={styles.container}>
        <Grid container spacing={24}>
          {this.props.events.map((event) => {
            return (
              <Grid key={event.id} item xs={12}>
                <EventCard
                  event={event}
                  onEdit={this.onEdit}
                  onDelete={this.onDelete}
                />
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }
}

export default graphql(EVENTS, {
  props: ({ data }) => ({ events: data.events }),
})(Events);
