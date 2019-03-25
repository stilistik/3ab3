import React from 'react';
import { Paper, Typography } from '@material-ui/core';

import styles from './AccountInfo.css';

const AccountInfo = () => {
  return (
    <Paper className={styles.accountinfo}>
      <Typography className={styles.typo} variant="body2">
        PostFinance Konto: 61-574119-3
      </Typography>
      <Typography className={styles.typo} variant="body2">
        IBAN: CH17 0900 0000 6157 4119 3
      </Typography>
    </Paper>
  );
};

export default AccountInfo;
