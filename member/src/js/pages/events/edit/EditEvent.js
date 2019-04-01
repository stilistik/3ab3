import React from 'react';
import { DefaultGrid } from 'Components';
import { Grid } from '@material-ui/core';
import Committee from './committee/Committee';

import styles from './EditEvent.css';

class EditEvent extends React.Component {
  render() {
    return (
      <DefaultGrid overflow>
        <div className={styles.container}>
          <Grid container spacing={24}>
            <Grid item xs={12} md={6}>
              <Committee />
            </Grid>
          </Grid>
        </div>
      </DefaultGrid>
    );
  }
}

export default EditEvent;
