import React from 'react';
import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  IconButton,
  makeStyles,
  TableContainer,
} from '@material-ui/core';
import { TablePagination, Tag, Box, Icon } from 'Components/index';
import { useQuery } from '@apollo/react-hooks';
import { TRANSACTIONS } from 'Graphql/queries';
import { Transaction, TransactionEdge } from 'Graphql/types';
import { useTranslation } from 'react-i18next';

interface AmountCellProps {
  transaction: Transaction;
}

const AmountCell: React.FC<AmountCellProps> = ({ transaction }) => {
  const color = transaction.change > 0 ? '#43a047' : '#f5222d';
  const prefix = transaction.change > 0 ? '+' : '';
  return (
    <TableCell align="left">
      <Tag outlined color={color}>
        {prefix + transaction.change.toFixed(2) + ' CHF'}
      </Tag>
    </TableCell>
  );
};

interface ActionCellProps {
  transaction: Transaction;
}

const ActionCell: React.FC<ActionCellProps> = ({ transaction }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <TableCell align="right">
      <Box.Row h="30px">
        <IconButton onClick={handleOpen}>
          <Icon type="edit" />
        </IconButton>
        <IconButton onClick={handleOpen}>
          <Icon type="delete" />
        </IconButton>
      </Box.Row>
    </TableCell>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    overflow: 'hidden',
  },
  stickyHeader: {
    backgroundColor: theme.palette.background.paper,
    fontWeight: 'bold',
    color: theme.palette.text.secondary,
  },
}));

export const GlobalTransactionTable: React.FC = () => {
  const [pageSize, setPageSize] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const styles = useStyles();
  const { t } = useTranslation();

  const skip = page * pageSize;
  const { loading, error, data } = useQuery(TRANSACTIONS, {
    variables: { first: pageSize, skip: skip },
  });

  const onChangePage = (page: number) => {
    setPage(page);
  };

  const onChangePageSize = (pageSize: number) => {
    setPage(0);
    setPageSize(pageSize);
  };

  if (data) {
    const {
      transactions: { edges },
    } = data;
    const transactions = edges.map((el: TransactionEdge) => el.node);
    return (
      <Paper className={styles.paper}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell classes={{ stickyHeader: styles.stickyHeader }}>
                  {t('Date')}
                </TableCell>
                <TableCell classes={{ stickyHeader: styles.stickyHeader }}>
                  {t('Member')}
                </TableCell>
                <TableCell
                  classes={{ stickyHeader: styles.stickyHeader }}
                  align="left"
                >
                  {t('Amount')}
                </TableCell>
                <TableCell
                  classes={{ stickyHeader: styles.stickyHeader }}
                  align="left"
                >
                  {t('Action')}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction: Transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell component="th" scope="row">
                    {new Date(transaction.date).toDateString()}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {transaction.user.name}
                  </TableCell>
                  <AmountCell transaction={transaction} />
                  <ActionCell transaction={transaction} />
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TablePagination
                rowsPerPageOptions={[30, 60, 90]}
                colSpan={4}
                count={100}
                pageSize={pageSize}
                page={page}
                onChangePage={onChangePage}
                onChangePageSize={onChangePageSize}
              />
            </TableFooter>
          </Table>
        </TableContainer>
      </Paper>
    );
  }

  if (loading || error) return null;
};
