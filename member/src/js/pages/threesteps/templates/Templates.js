import React from 'react';
import { Grid } from 'Components';
import TemplateList from './TemplateList';
import CreateTemplate from './CreateTemplate';

import styles from './Templates.css';

class Templates extends React.Component {
  render() {
    return (
      <Grid.Default>
        <div className={styles.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TemplateList />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CreateTemplate />
            </Grid>
          </Grid>
        </div>
      </Grid.Default>
    );
  }
}

export default Templates;
