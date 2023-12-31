import React from 'react';
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  makeStyles,
} from '@material-ui/core';
import { Tag, Loading, Error } from 'Components';
import { useQuery } from '@apollo/react-hooks';
import { BALANCE_TABLE } from 'Graphql/queries';
import { useTranslation } from 'react-i18next';

const TransactionCell = ({ user }) => {
  const { t } = useTranslation();
  const { edges } = user.transactions;
  const transaction = edges.length ? edges[0].node : null;
  if (transaction)
    return <TableCell>{new Date(transaction.date).toDateString()}</TableCell>;
  else return <TableCell>{t('None')}</TableCell>;
};

const BalanceCell = ({ balance }) => {
  const amount =
    balance >= 0 ? (
      <Tag outlined color="#43a047">
        {'+' + balance.toFixed(2) + ' CHF'}
      </Tag>
    ) : (
      <Tag outlined color="#f5222d">
        {balance.toFixed(2) + ' CHF'}
      </Tag>
    );
  return <TableCell align="right">{amount}</TableCell>;
};

const useStyles = makeStyles((theme) => ({
  paper: {
    overflow: 'hidden',
  },
  container: {
    maxHeight: '600px',
  },
  stickyHeader: {
    backgroundColor: theme.palette.background.paper,
    fontWeight: 'bold',
    color: theme.palette.text.secondary,
  },
}));

const BalanceTable = () => {
  const { t } = useTranslation();
  const styles = useStyles();
  const { loading, error, data } = useQuery(BALANCE_TABLE);

  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;

  const { users } = data;
  return (
    <Paper className={styles.paper}>
      <TableContainer className={styles.container}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell classes={{ stickyHeader: styles.stickyHeader }}>
                {t('Name')}
              </TableCell>
              <TableCell classes={{ stickyHeader: styles.stickyHeader }}>
                {t('Last Transaction')}
              </TableCell>
              <TableCell
                align="right"
                classes={{ stickyHeader: styles.stickyHeader }}
              >
                {t('Amount')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => {
              return (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TransactionCell user={user} />
                  <BalanceCell balance={user.balance} />
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default BalanceTable;
