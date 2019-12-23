import React from 'react';
import { Grid } from '@material-ui/core';
import { EventCard } from 'Components';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { requestRoute } from 'History';
import { CreateEvent } from './CreateEvent';

import styles from './Events.less';

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

const Events = () => {
  const { loading, error, data } = useQuery(EVENTS);
  if (loading || error) return null;
  
  const onEdit = () => {};

  const onDelete = () => {};

  const { events } = data;
  return (
    <div className={styles.container}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <CreateEvent />
        </Grid>
        {events.map((event) => {
          return (
            <Grid key={event.id} item xs={12}>
              <EventCard event={event} onEdit={onEdit} onDelete={onDelete} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Events;
