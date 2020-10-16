import React from 'react';
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import { Tag } from 'Components';
import { useQuery } from '@apollo/react-hooks';
import { BALANCE_TABLE } from 'Graphql/queries';
import { useTranslation } from 'react-i18next';

const TransactionCell = ({ user }) => {
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

const BalanceTable = () => {
  const { t } = useTranslation();
  const { loading, error, data } = useQuery(BALANCE_TABLE);
  if (loading || error) return null;

  const { users } = data;
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('Name')}</TableCell>
            <TableCell>{t('Last Transaction')}</TableCell>
            <TableCell align="right">{t('Amount')}</TableCell>
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
    </Paper>
  );
};

export default BalanceTable;
