import React from 'react';
import { DefaultGrid } from 'Components';
import { Grid } from '@material-ui/core';
import TemplateList from './templates/TemplateList';
import CreateTemplate from './templates/CreateTemplate';

import styles from './ThreeSteps.css';

class ThreeSteps extends React.Component {
  render() {
    return (
      <DefaultGrid>
        <div className={styles.container}>
          <Grid container spacing={24}>
            <Grid item xs={12} md={6}>
              <TemplateList />
            </Grid>
            <Grid item xs={12} md={6}>
              <CreateTemplate />
            </Grid>
          </Grid>
        </div>
      </DefaultGrid>
    );
  }
}

export default ThreeSteps;
