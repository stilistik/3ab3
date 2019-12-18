import React from 'react';
import { Typography, Grid, Divider, Paper } from '@material-ui/core';
import { DefaultGrid, Container } from 'Components';
import { GlobalBalanceChart } from './GlobalBalanceChart';
import GlobalConsumptionChart from './GlobalConsumptionChart';
import BalanceTable from './BalanceTable';

import styles from './Dashboard.less';

export const Dashboard = () => {
  return (
    <Container>
      <DefaultGrid overflow>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5" className={styles.typo}>
              DASHBOARD
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <GlobalBalanceChart />
          </Grid>
          <Grid item xs={12} sm={6}>
            <BalanceTable />
          </Grid>
          <Grid item xs={12} sm={6}>
            <GlobalConsumptionChart />
          </Grid>
        </Grid>
      </DefaultGrid>
    </Container>
  );
};

export default Dashboard;
