import React from 'react';
import { DefaultGrid } from 'Components';
import { Grid } from '@material-ui/core';
import Balance from './balance/Balance';
import Products from './products/Products';
import AccountInfo from './info/AccountInfo';
import TransactionTable from './TransactionTable';

import styles from './Profile.css';

class Profile extends React.Component {
  render() {
    return (
      <DefaultGrid overflow>
        <div className={styles.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <AccountInfo />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Balance />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Products />
            </Grid>
            <Grid item xs={12}>
              <TransactionTable />
            </Grid>
          </Grid>
        </div>
      </DefaultGrid>
    );
  }
}

export default Profile;
