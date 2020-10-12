import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import BalanceDisplay from './balance/BalanceDisplay';

import styles from './CurrentBalance.less';

const CurrentBalance = () => {
  return (
    <Paper className={styles.container}>
      <BalanceDisplay />
      <div>
        <Typography className={styles.typo} variant="h5">
          PostFinance: 61-574119-3
        </Typography>
        <br />
        <Typography className={styles.typo} variant="h5">
          IBAN: CH17 0900 0000 6157 4119 3
        </Typography>
      </div>
    </Paper>
  );
};

export default CurrentBalance;
