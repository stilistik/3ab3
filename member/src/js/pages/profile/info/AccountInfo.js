import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import BalanceDisplay from './BalanceDisplay';
import RegisterPayment from './RegisterPayment';

import styles from './AccountInfo.css';

const AccountInfo = () => {
  return (
    <Paper className={styles.accountinfo}>
      <BalanceDisplay />
      <div className={styles.accounts}>
        <Typography className={styles.typo} variant="body1">
          PostFinance Konto: 61-574119-3
        </Typography>
        <Typography className={styles.typo} variant="body1">
          IBAN: CH17 0900 0000 6157 4119 3
        </Typography>
      </div>
      <RegisterPayment />
    </Paper>
  );
};

export default AccountInfo;
