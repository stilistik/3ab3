import React from 'react';
import { Grid, Box, Loading, Error } from 'Components';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Questionnaire from './Questionnaire';

export const QUESTIONS = gql`
  query($eventId: ID!) {
    event(eventId: $eventId) {
      id
      date
    }
    questions {
      id
      text
      description
      templates {
        id
        text
        offsetDays
      }
    }
  }
`;

const Steps = ({ eventId }) => {
  const { loading, error, data } = useQuery(QUESTIONS, {
    variables: { eventId },
  });

  if (error) return <Error message={error.message} />;
  if (loading) return <Loading />;

  const { questions, event } = data;
  return (
    <Box w="100%" o="hidden" py="20px">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Questionnaire questions={questions} event={event} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Steps;
