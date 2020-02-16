import React from 'react';
import { Grid, Box, Loading, Error } from 'Components';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import CreateCommittee from './CreateCommittee';
import ListCommittee from './ListCommittee';

export const COMMITTEE = gql`
  query($eventId: ID!) {
    event(eventId: $eventId) {
      id
      committee {
        id
        creator {
          id
          avatar
          name
        }
        members {
          id
          avatar
          name
        }
      }
    }
  }
`;

const Committee = ({ eventId }) => {
  const { loading, error, data } = useQuery(COMMITTEE, {
    variables: { eventId: eventId },
  });

  if (error) return <Error message={error.message} />;
  if (loading) return <Loading />;

  const { event } = data;
  return (
    <Box w="100%" o="hidden" py="20px">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <CreateCommittee committee={event.committee} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ListCommittee committee={event.committee} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Committee;
