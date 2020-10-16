import React from 'react';
import { EventCard, Grid, Box } from 'Components/index';
import { usePaginatedQuery } from 'Components/utility/usePaginatedQuery';
import { Button } from '@material-ui/core';
import { ALL_EVENTS_FEED } from 'Graphql/queries';
import { Event } from 'Graphql/types';

export const AllEvents = () => {
  const {
    loading,
    error,
    nodes,
    fetchMore,
    hasNext,
    cursor,
  } = usePaginatedQuery<Event>(ALL_EVENTS_FEED, 10);

  if (loading || error) return null;

  return (
    <Grid.Default>
      <Box py="20px">
        <Grid container spacing={3}>
          {nodes.map((event) => {
            return (
              <Grid key={event.id} item xs={12} sm={6}>
                <EventCard event={event} />
              </Grid>
            );
          })}
        </Grid>
        {hasNext ? (
          <Box.Row jc="center" my={2}>
            <Button onClick={() => fetchMore(cursor)}>More</Button>
          </Box.Row>
        ) : null}
      </Box>
    </Grid.Default>
  );
};