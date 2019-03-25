import React from 'react';
import { DefaultGrid } from 'Components';
import { Grid } from '@material-ui/core';
import Feed from './feed/Feed';
import Balance from './balance/Balance';

// import styles from './Home.css';

class Home extends React.Component {
  render() {
    return (
      <DefaultGrid overflow>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Feed />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Balance />
          </Grid>
        </Grid>
      </DefaultGrid>
    );
  }
}

export default Home;
