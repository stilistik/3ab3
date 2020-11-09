import React from 'react';
import { Masonry, EventCard, Grid, Box } from 'Components/index';
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
        <Masonry>
          {nodes.map((event) => {
            return <EventCard key={event.id} event={event} />;
          })}
        </Masonry>
        {hasNext ? (
          <Box.Row jc="center" my={2}>
            <Button onClick={() => fetchMore(cursor)}>More</Button>
          </Box.Row>
        ) : null}
      </Box>
    </Grid.Default>
  );
};

export default AllEvents;
