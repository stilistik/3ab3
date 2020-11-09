import React from 'react';
import { Grid, Box } from 'Components/index';
import { Divider, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { GlobalTransactionTable } from './GlobalTransactionTable';

export const Transactions: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Grid.Default>
      <Box py="20px">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5" color="textPrimary">
              {t('Transactions').toUpperCase()}
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <GlobalTransactionTable />
          </Grid>
        </Grid>
      </Box>
    </Grid.Default>
  );
};

export default Transactions;
