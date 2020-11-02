import React from 'react';
import { Masonry, EventCard, Grid, Box } from 'Components/index';
import { usePaginatedQuery } from 'Components/utility/usePaginatedQuery';
import { Button, makeStyles } from '@material-ui/core';
import { ALL_EVENTS_FEED } from 'Graphql/queries';
import { Event } from 'Graphql/types';

const useStyles = makeStyles((theme) => ({
  grid: {
    display: 'flex',
    marginLeft: -theme.spacing(3) /* gutter size offset */,
    width: 'auto',
  },
  column: {
    paddingLeft: theme.spacing(3) /* gutter size */,
    backgroundClip: 'padding-box',
  },
}));

export const AllEvents = () => {
  const {
    loading,
    error,
    nodes,
    fetchMore,
    hasNext,
    cursor,
  } = usePaginatedQuery<Event>(ALL_EVENTS_FEED, 10);
  const styles = useStyles();

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
