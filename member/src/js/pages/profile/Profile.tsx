import React from 'react';
import { Box, Grid } from 'Components/index';
import { Typography, Divider } from '@material-ui/core';
import BalanceChart from './BalanceChart';
import ConsumptionChart from './ConsumptionChart';
import CurrentBalance from './CurrentBalance';
import TransactionTable from './TransactionTable';
import { useTranslation } from 'react-i18next';

export const Profile: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Grid.Default>
      <Box py="20px">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5" color="textPrimary">
              {t('Profile').toUpperCase()}
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <CurrentBalance />
          </Grid>
          <Grid item xs={12}>
            <BalanceChart />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TransactionTable />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ConsumptionChart />
          </Grid>
        </Grid>
      </Box>
    </Grid.Default>
  );
};

export default Profile;
