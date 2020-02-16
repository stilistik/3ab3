import React from 'react';
import { EventCard, Grid, Box } from 'Components';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { requestRoute } from 'History';
import { CreateEvent } from './CreateEvent';

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

  const { events } = data;
  return (
    <Box py="20px">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <CreateEvent />
        </Grid>
        {events.map((event) => {
          console.log(event);
          return (
            <Grid key={event.id} item xs={12}>
              <EventCard event={event} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Events;
