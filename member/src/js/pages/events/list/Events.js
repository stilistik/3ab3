import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { DefaultGrid, CreateButton } from 'Components';
import { Grid } from '@material-ui/core';
import { requestRoute } from 'History';
import { EventCard } from 'Components';

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
  onCreate = () => {
    requestRoute('/createevent');
  };

  render() {
    if (!this.props.events) return null;
    return (
      <DefaultGrid overflow>
        <div className={styles.container}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <CreateButton onClick={this.onCreate} />
            </Grid>
            {this.props.events.map((event) => {
              return (
                <Grid key={event.id} item xs={12} lg={6}>
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
      </DefaultGrid>
    );
  }
}

export default graphql(EVENTS, {
  props: ({ data }) => ({ events: data.events }),
})(Events);
