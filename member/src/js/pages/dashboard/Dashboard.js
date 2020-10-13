import React from 'react';
import { Typography, Divider } from '@material-ui/core';
import { Grid, Box } from 'Components';
import { GlobalBalanceChart } from './GlobalBalanceChart';
import GlobalConsumptionChart from './GlobalConsumptionChart';
import BalanceTable from './BalanceTable';
import { PaymentReminder } from './PaymentReminder';
import { RegisterPayment } from './RegisterPayment';

export const Dashboard = () => {
  return (
    <Grid.Default>
      <Box py="20px">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5">DASHBOARD</Typography>
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
          <Grid item xs={12} sm={6}>
            <PaymentReminder />
          </Grid>
          <Grid item xs={12} sm={6}>
            <RegisterPayment />
          </Grid>
        </Grid>
      </Box>
    </Grid.Default>
  );
};

export default Dashboard;
