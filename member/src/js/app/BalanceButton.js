import React from 'react';
import { Fab } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { requestRoute } from 'History';
import { Utils } from 'Utils';

import styles from './BalanceButton.less';

const USER = gql`
  query {
    currentUser {
      id
      balance
    }
  }
`;

const BalanceButton = () => {
  const { loading, error, data } = useQuery(USER);

  if (loading || error) return null;

  const onClick = () => {
    requestRoute('/profile');
  };

  const user = data.currentUser;
  const { cls } = Utils.getBalanceColorClass(user.balance);
  const balance = user.balance.toFixed(2);
  return (
    <Fab
      variant="extended"
      size="small"
      className={styles[cls]}
      classes={{ extended: styles.btn }}
      onClick={onClick}
    >
      {balance} CHF
    </Fab>
  );
};

export default BalanceButton;
