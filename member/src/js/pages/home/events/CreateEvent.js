import React from 'react';
import { Icon } from 'Components';
import {
  Typography,
  ExpansionPanelDetails,
  ExpansionPanel,
  ExpansionPanelSummary,
} from '@material-ui/core';
import CreateEventForm from './CreateEventForm';

import styles from './CreateEvent.less';

export const CreateEvent = () => {
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        className={styles.summary}
        expandIcon={<Icon type="down" />}
      >
        <Typography className={styles.typo} variant="h6">
          Create Event
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={styles.details}>
        <CreateEventForm />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default CreateEvent;
