import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import BalanceDisplay from './BalanceDisplay';

import styles from './AccountInfo.css';


const AccountInfo = () => {
  return (
    <Paper className={styles.accountinfo}>
      <BalanceDisplay />
      <Typography className={styles.typo} variant="body1">
        PostFinance Konto: 61-574119-3
      </Typography>
      <Typography className={styles.typo} variant="body1">
        IBAN: CH17 0900 0000 6157 4119 3
      </Typography>
    </Paper>
  );
};

export default AccountInfo;
