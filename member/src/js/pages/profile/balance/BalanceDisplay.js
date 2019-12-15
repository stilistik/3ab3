import React from 'react';
import { UserAvatar } from 'Components';
import { Typography } from '@material-ui/core';
import gql from 'graphql-tag';
import { Utils } from 'Utils';
import { graphql } from 'react-apollo';

import styles from './BalanceDisplay.css';

export const BALANCE_DISPLAY_QUERY = gql`
  query {
    currentUser {
      id
      balance
      avatar
      name
    }
  }
`;

const BalanceDisplay = ({ user }) => {
  if (!user) return null;
  const { cls } = Utils.getBalanceColorClass(user.balance);

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

export default graphql(BALANCE_DISPLAY_QUERY, {
  props: ({ data }) => ({ user: data.currentUser }),
})(BalanceDisplay);
