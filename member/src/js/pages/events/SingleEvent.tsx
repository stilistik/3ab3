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
import { EventCommittee } from './EventCommittee';
import { PublishEvent } from './PublishEvent';
import { DeleteEvent } from './DeleteEvent';

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
            <Box cmbnl={3}>
              <Todos event={event} />
              <EventInfo event={event} />
              <EventImage
                event={event}
                fieldId="image"
                label="Front Image"
                helpText="This will be the most prominent image to represent the event on the public website."
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box cmbnl={3}>
              <EventImage
                event={event}
                fieldId="flyer"
                label="Event Flyer"
                helpText="An image of the event flyer, if there is one."
              />
              <EventCommittee event={event} />
              <PublishEvent event={event} />
              <DeleteEvent event={event} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Grid.Default>
  );
};
