import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import { requestRoute } from 'App/router/History';
import { getBalanceColorClass } from 'Components/utility/Utils';
import { CURRENT_USER_BALANCE } from 'Graphql/queries';

const useStyles = makeStyles({
  button: {
    height: '30px',
    fontWeight: 'bold',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '15px',
    padding: '0px 10px',
  },
  low: {
    backgroundColor: '#43a047',
    '&:hover': {
      backgroundColor: '#43a047',
    },
  },
  medium: {
    backgroundColor: '#ffa000',
    '&:hover': {
      backgroundColor: '#ffa000',
    },
  },
  high: {
    backgroundColor: '#d32f2f',
    '&:hover': {
      backgroundColor: '#d32f2f',
    },
  },
});

export const BalanceButton: React.FC = () => {
  const styles = useStyles();
  const { loading, error, data } = useQuery(CURRENT_USER_BALANCE);

  if (loading || error) return null;

  const onClick = () => {
    requestRoute('/profile');
  };

  const user = data.currentUser;
  const { cls } = getBalanceColorClass(user.balance);
  const balance = user.balance.toFixed(2);
  return (
    <Button
      className={styles[cls]}
      classes={{ root: styles.button }}
      onClick={onClick}
    >
      {balance} CHF
    </Button>
  );
};
