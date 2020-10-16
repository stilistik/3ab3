import React from 'react';
import { Event } from 'Graphql/types';
import { Paper, Typography } from '@material-ui/core';
import { PaperHeader } from '../PaperHeader';
import { LazyLoadingImage } from 'Components/index';
import { UploadEventImage, UploadEventImageProps } from './UploadEventImage';
import { SINGLE_EVENT } from 'Graphql/queries';
import { HelpPopover } from '../HelpPopover';

interface EventImageProps {
  event: Event;
  fieldId: UploadEventImageProps['fieldId'];
  label: string;
  helpText: React.ReactNode;
}

export const EventImage: React.FC<EventImageProps> = ({
  event,
  fieldId,
  label,
  helpText,
}) => {
  const refetchQueries = () => [
    { query: SINGLE_EVENT, variables: { eventId: event.id } },
  ];

  return (
    <Paper>
      <PaperHeader title={label}>
        <HelpPopover>{helpText}</HelpPopover>
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
