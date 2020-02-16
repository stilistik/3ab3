import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Box, Loading, Error } from 'Components';
import { EventCard } from 'Components';

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

export const Events = () => {
  const { loading, error, data } = useQuery(EVENTS);

  if (error) return <Error message={error.message} />;
  if (loading) return <Loading />;

  const onEdit = () => {};
  const onDelete = () => {};

  return (
    <Grid.Default>
      <Box py="20px">
        <Grid container spacing={3}>
          {data.events.map((event) => {
            return (
              <Grid key={event.id} item xs={12} lg={6}>
                <EventCard event={event} onEdit={onEdit} onDelete={onDelete} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Grid.Default>
  );
};

export default Events;
