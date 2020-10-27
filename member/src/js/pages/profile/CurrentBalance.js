import React from 'react';
import { Box } from 'Components/index';
import { Paper, Typography } from '@material-ui/core';
import BalanceDisplay from './balance/BalanceDisplay';

const CurrentBalance = () => {
  return (
    <Paper>
      <Box p={2}>
        <BalanceDisplay />
        <Typography variant="h6">PostFinance: 61-574119-3</Typography>
        <Typography variant="h6">IBAN: CH17 0900 0000 6157 4119 3</Typography>
      </Box>
    </Paper>
  );
};

export default CurrentBalance;
