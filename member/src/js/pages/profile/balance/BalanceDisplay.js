import React from 'react';
import { UserAvatar } from 'Components';
import { Typography } from '@material-ui/core';

import styles from './BalanceDisplay.css';

const BalanceDisplay = ({ user }) => {
  let cls;
  if (user.balance < 30) cls = 'low';
  else if (user.balance >= 30 && user.balance <= 60) cls = 'medium';
  else cls = 'high';

  const balance = user.balance.toFixed(2);

  return (
    <div className={styles.balance}>
      <UserAvatar user={user} className={styles.avatar} />
      <Typography className={styles.typo} variant="h6">
        Balance:
      </Typography>
      <Typography className={styles[cls]} variant="h6">
        {balance} CHF
      </Typography>
    </div>
  );
};

export default BalanceDisplay;
