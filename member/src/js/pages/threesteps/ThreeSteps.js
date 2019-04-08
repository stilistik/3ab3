import React from 'react';
import { DefaultGrid } from 'Components';
import { Grid } from '@material-ui/core';
import QuestionList from './questions/QuestionList';

import styles from './ThreeSteps.css';

class ThreeSteps extends React.Component {
  render() {
    return (
      <DefaultGrid>
        <div className={styles.container}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <QuestionList />
            </Grid>
          </Grid>
        </div>
      </DefaultGrid>
    );
  }
}

export default ThreeSteps;
