import React from 'react';
import { DefaultGrid } from 'Components';
import { Typography } from '@material-ui/core';
import CreateEventForm from './CreateEventForm';

import styles from './CreateEvent.css';

class CreateProduct extends React.Component {
  render() {
    return (
      <DefaultGrid overflow>
        <div className={styles.container}>
          <Typography variant="h3" className={styles.typo}>
            New Event
          </Typography>
          <CreateEventForm />
        </div>
      </DefaultGrid>
    );
  }
}

export default CreateProduct;
