import React from 'react';
import { Icon } from 'Components';
import {
  Typography,
  AccordionDetails,
  Accordion,
  AccordionSummary,
} from '@material-ui/core';
import CreateEventForm from './CreateEventForm';

import styles from './CreateEvent.less';

export const CreateEvent = () => {
  return (
    <Accordion>
      <AccordionSummary
        className={styles.summary}
        expandIcon={<Icon type="down" />}
      >
        <Typography className={styles.typo} variant="h6">
          Create Event
        </Typography>
      </AccordionSummary>
      <AccordionDetails className={styles.details}>
        <CreateEventForm />
      </AccordionDetails>
    </Accordion>
  );
};

export default CreateEvent;
