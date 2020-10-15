import React from 'react';
import { Event } from 'Graphql/types';
import { Paper, Typography } from '@material-ui/core';
import { PaperHeader } from '../PaperHeader';
import { LazyLoadingImage } from 'Components/index';
import { UploadEventImage, UploadEventImageProps } from './UploadEventImage';
import { SINGLE_EVENT } from 'Graphql/queries';

interface EventImageProps {
  event: Event;
  fieldId: UploadEventImageProps['fieldId'];
  label: string;
}

export const EventImage: React.FC<EventImageProps> = ({
  event,
  fieldId,
  label,
}) => {
  const refetchQueries = () => [
    { query: SINGLE_EVENT, variables: { eventId: event.id } },
  ];

  return (
    <Paper>
      <PaperHeader title={label}>
        <UploadEventImage
          event={event}
          fieldId={fieldId}
          refetchQueries={refetchQueries}
        />
      </PaperHeader>
      <LazyLoadingImage src={event[fieldId]} width="100%" />
    </Paper>
  );
};
