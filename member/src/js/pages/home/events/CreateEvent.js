import React from 'react';
import { Icon, Message } from 'Components';
import {
  Typography,
  AccordionDetails,
  Accordion,
  AccordionSummary,
} from '@material-ui/core';
import EventForm from './EventForm';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo';

import styles from './CreateEvent.less';

const MUTATION = gql`
  mutation($input: EventInput!) {
    createEvent(input: $input) {
      id
    }
  }
`;

export const CreateEvent = ({ refetch }) => {
  const [expanded, setExpanded] = React.useState(false);

  const [createEvent] = useMutation(MUTATION);

  const handleSubmit = async (values) => {
    try {
      await createEvent({
        variables: {
          input: values,
        },
      });
      await refetch();
      setExpanded(false);
    } catch (error) {
      Message.error(error.message);
      return;
    }
    Message.success('Event successfully created');
  };

  return (
    <Accordion
      expanded={expanded}
      onChange={() => setExpanded((expanded) => !expanded)}
    >
      <AccordionSummary
        className={styles.summary}
        expandIcon={<Icon type="down" />}
      >
        <Typography className={styles.typo} variant="h6">
          Create Event
        </Typography>
      </AccordionSummary>
      <AccordionDetails className={styles.details}>
        <EventForm onSubmit={handleSubmit} />;
      </AccordionDetails>
    </Accordion>
  );
};

export default CreateEvent;
