import React from 'react';
import { EventCard, Grid, Box } from 'Components/index';
import { CreateEvent } from './CreateEvent';
import { Button } from '@material-ui/core';
import { DocumentNode } from 'graphql';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
}

interface EventFeedProps {
  events: Event[];
  refetch: { query: DocumentNode; variables: any }[];
  hasNext: boolean;
  cursor: string;
  more: (cursor: string) => void;
}

export const EventFeed: React.FC<EventFeedProps> = ({
  events,
  hasNext,
  more,
  cursor,
  refetch,
}) => {
  return (
    <Box py="20px">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <CreateEvent refetch={refetch} />
        </Grid>
        {events.map((event) => {
          return (
            <Grid key={event.id} item xs={12}>
              <EventCard event={event} />
            </Grid>
          );
        })}
        {hasNext ? (
          <Grid item xs={12}>
            <Box.Row jc="center">
              <Button onClick={() => more(cursor)}>More</Button>
            </Box.Row>
          </Grid>
        ) : null}
      </Grid>
    </Box>
  );
};
