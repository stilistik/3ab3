import React from 'react';
import { Box } from 'Components/index';
import { SINGLE_EVENT } from 'Graphql/queries';
import { Event } from 'Graphql/types';
import { Paper, Typography } from '@material-ui/core';
import { PaperHeader } from '../PaperHeader';
import { EditInfo } from './EditInfo';

interface EventInfoProps {
  event: Event;
}

export const EventInfo: React.FC<EventInfoProps> = ({ event }) => {
  const refetchQueries = () => [
    { query: SINGLE_EVENT, variables: { eventId: event.id } },
  ];

  return (
    <Paper>
      <PaperHeader title="Info">
        <EditInfo event={event} refetchQueries={refetchQueries} />
      </PaperHeader>
      <Box.Fill p={2} cmbnl={1}>
        <Typography variant="body1">
          Event Name:
          {event.title}
        </Typography>
        <Typography variant="body1">
          Location:
          {event.place}
        </Typography>
        <Typography variant="body1">
          Date:
          {event.date}
        </Typography>
        <Typography variant="body1">
          Description:
          {event.description}
        </Typography>
      </Box.Fill>
    </Paper>
  );
};
