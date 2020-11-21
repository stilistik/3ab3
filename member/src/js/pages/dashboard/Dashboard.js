import React from 'react';
import { Typography, Divider } from '@material-ui/core';
import { Grid, Box } from 'Components';
import { GlobalBalanceChart } from './GlobalBalanceChart';
import GlobalConsumptionChart from './GlobalConsumptionChart';
import BalanceTable from './BalanceTable';
import { PaymentReminder } from './PaymentReminder';
import { RegisterPayment } from './RegisterPayment';
import { useTranslation } from 'react-i18next';
import { Debt } from 'Pages/dashboard/Debt';

export const Dashboard = () => {
  const { t } = useTranslation();
  return (
    <Grid.Default>
      <Box py="20px">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5" color="textPrimary">
              {t('Dashboard').toUpperCase()}
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <GlobalBalanceChart />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box cmbnl={3}>
              <BalanceTable />
              <PaymentReminder />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box cmbnl={3}>
              <GlobalConsumptionChart />
              <RegisterPayment />
              <Debt />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Grid.Default>
  );
};

export default Dashboard;
