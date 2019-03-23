import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { DefaultGrid, Icon } from 'Components';
import { Fab, Grid, Hidden } from '@material-ui/core';
import { requestRoute } from 'History';
import EventCard from './EventCard';

import styles from './Events.css';

const QUERY = gql`
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
            <Hidden smUp>
              <Fab
                color="primary"
                className={styles.fab}
                onClick={this.onCreate}
              >
                <Icon type="add" />
              </Fab>
            </Hidden>
          </Grid>
        </div>
      </DefaultGrid>
    );
  }
}

export default graphql(QUERY, {
  props: ({ data }) => ({ events: data.events }),
})(Events);
