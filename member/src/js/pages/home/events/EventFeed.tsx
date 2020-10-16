import React from 'react';
import { EventCard, Grid, Box } from 'Components/index';
import { CreateEvent } from './CreateEvent';
import { Button } from '@material-ui/core';
import { Event } from 'Graphql/types';
import { useTranslation } from 'react-i18next';

interface EventFeedProps {
  events: Event[];
  refetch: () => Promise<any>;
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
  const { t } = useTranslation();

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
              <Button onClick={() => more(cursor)}>{t('More')}</Button>
            </Box.Row>
          </Grid>
        ) : null}
      </Grid>
    </Box>
  );
};
