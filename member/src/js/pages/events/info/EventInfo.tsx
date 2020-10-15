import React from 'react';
import { Box } from 'Components/index';
import { SINGLE_EVENT } from 'Graphql/queries';
import { Event } from 'Graphql/types';
import { Paper, Typography } from '@material-ui/core';
import { PaperHeader } from '../PaperHeader';
import { EditInfo } from './EditInfo';

interface InfoItemProps {
  label: string;
  content: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ label, content }) => {
  return (
    <React.Fragment>
      <Typography variant="body2" color="textSecondary">
        {label}
      </Typography>
      <Typography variant="body1">{content || '-'}</Typography>
    </React.Fragment>
  );
};

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
        <InfoItem label="Event Name" content={event.title} />
        <InfoItem label="Location" content={event.place} />
        <InfoItem label="Date" content={new Date(event.date).toDateString()} />
        <InfoItem label="Time" content={new Date(event.date).toLocaleTimeString()} />
        <InfoItem label="Description" content={event.description} />
      </Box.Fill>
    </Paper>
  );
};
