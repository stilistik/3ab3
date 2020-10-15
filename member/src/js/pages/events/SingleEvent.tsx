import React from 'react';
import { getQueryParams, updateParams } from 'App/router/History';
import { useQuery } from 'react-apollo';
import { Loading, Error, Grid, Box } from 'Components/index';
import { SINGLE_EVENT } from 'Graphql/queries';
import { Todos } from './todo/Todos';
import { Event } from 'Graphql/types';
import { Divider, Typography } from '@material-ui/core';
import { EventInfo } from './info/EventInfo';
import { EventImage } from './images/EventImage';

export const SingleEvent: React.FC = () => {
  const { id } = getQueryParams();

  React.useEffect(() => {
    return () => updateParams({ id: undefined });
  }, []);

  const { loading, error, data } = useQuery(SINGLE_EVENT, {
    variables: { eventId: id },
  });

  if (error) return <Error message={error.message} />;
  if (loading) return <Loading />;

  const event = data.event as Event;

  return (
    <Grid.Default>
      <Box py="20px">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5">
              {event?.title?.toUpperCase() || 'EVENT'}
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Todos event={event} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <EventInfo event={event} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <EventImage event={event} fieldId="image" label="Front Image" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <EventImage event={event} fieldId="flyer" label="Event Flyer" />
          </Grid>
        </Grid>
      </Box>
    </Grid.Default>
  );
};
