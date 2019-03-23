import React from 'react';
import { DefaultGrid } from 'Components';
import { Grid } from '@material-ui/core';
import Feed from './feed/Feed';

import styles from './Home.css';

class Home extends React.Component {
  render() {
    return (
      <DefaultGrid overflow>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Feed />
          </Grid>
        </Grid>
      </DefaultGrid>
    );
  }
}

export default Home;
