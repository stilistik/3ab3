import React from 'react';
import { DefaultGrid } from 'Components';
import { Grid } from '@material-ui/core';
import TemplateList from './TemplateList';
import CreateTemplate from './CreateTemplate';

import styles from './Templates.css';

class Templates extends React.Component {
  render() {
    return (
      <DefaultGrid overflow>
        <div className={styles.container}>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
              <TemplateList />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CreateTemplate />
            </Grid>
          </Grid>
        </div>
      </DefaultGrid>
    );
  }
}

export default Templates;
