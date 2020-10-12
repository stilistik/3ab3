import React from 'react';
import gql from 'graphql-tag';
import { EventCard, Grid, Box } from 'Components';
import { usePaginatedQuery } from 'Components/utility/usePaginatedQuery';
import { Button } from '@material-ui/core';

export const EVENT_FEED = gql`
  query($first: Int!, $after: String) {
    events(first: $first, after: $after) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          title
          description
          date
          image
        }
      }
    }
  }
`;

export const Events = () => {
  const {
    loading,
    error,
    nodes,
    fetchMore,
    hasNext,
    cursor,
  } = usePaginatedQuery(EVENT_FEED, 3);

  if (loading || error) return null;

  const onEdit = () => {};
  const onDelete = () => {};

  return (
    <Grid.Default>
      <Box py="20px">
        <Grid container spacing={3}>
          {nodes.map((event) => {
            return (
              <Grid key={event.id} item xs={12} lg={6}>
                <EventCard event={event} onEdit={onEdit} onDelete={onDelete} />
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

export default Events;
