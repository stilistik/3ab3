import React from 'react';
import { Fab, makeStyles } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import { requestRoute } from 'History/index';
import { getBalanceColorClass } from 'Components/utility/Utils';
import { CURRENT_USER_BALANCE } from 'Graphql/queries';

const useStyles = makeStyles({
  button: {
    height: '30px',
    fontWeight: 'bold',
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
    <Fab
      variant="extended"
      size="small"
      className={styles[cls]}
      classes={{ extended: styles.button }}
      onClick={onClick}
    >
      {balance} CHF
    </Fab>
  );
};
