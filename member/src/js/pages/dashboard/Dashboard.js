import React from 'react';
import { Typography, Grid, Divider, Paper } from '@material-ui/core';
import { DefaultGrid } from 'Components';
import { GlobalBalanceChart } from './GlobalBalanceChart';

import styles from './Dashboard.less';

export const Dashboard = () => {
  return (
    <DefaultGrid overflow>
      <Grid container>
        <Grid item xs={12}>
          <div className={styles.header}>
            <Typography variant="h5" className={styles.typo}>
              DASHBOARD
            </Typography>
            <Divider />
            <GlobalBalanceChart />
          </div>
        </Grid>
      </Grid>
    </DefaultGrid>
  );
};

export default Dashboard;
