import React from 'react';
import { DefaultGrid } from 'Components';
import { Grid } from '@material-ui/core';
import Balance from './balance/Balance';
import Products from './products/Products';

class Profile extends React.Component {
  render() {
    return (
      <DefaultGrid>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Balance />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Products />
          </Grid>
        </Grid>
      </DefaultGrid>
    );
  }
}

export default Profile;
