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
import { CURRENT_USER_TRANSACTIONS } from 'Graphql/queries';
import { Transaction, TransactionEdge } from 'Graphql/types';
import { PurchaseReceipt } from './PurchaseReceipt';
import { NanoCreditReceipt } from './NanoCreditReceipt';

interface AmountCellProps {
  transaction: Transaction;
}

const AmountCell: React.FC<AmountCellProps> = ({ transaction }) => {
  const color = transaction.change > 0 ? '#43a047' : '#f5222d';
  const prefix = transaction.change > 0 ? '+' : '';
  return (
    <TableCell align="right">
      <Tag outlined color={color}>
        {prefix + transaction.change.toFixed(2) + ' CHF'}
      </Tag>
    </TableCell>
  );
};

interface ReceiptCellProps {
  transaction: Transaction;
}

const ReceiptCell: React.FC<ReceiptCellProps> = ({ transaction }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <TableCell align="left">
      <Box.Row h="30px">
        {transaction.type === 'PURCHASE' && (
          <React.Fragment>
            <IconButton onClick={handleOpen}>
              <Icon type="assignment" />
            </IconButton>
            <PurchaseReceipt
              open={open}
              handleClose={handleClose}
              purchaseId={transaction.purchase.id}
            />
          </React.Fragment>
        )}
        {transaction.type === 'NANOCREDIT' && (
          <React.Fragment>
            <IconButton onClick={handleOpen}>
              <Icon type="assignment" />
            </IconButton>
            <NanoCreditReceipt
              open={open}
              handleClose={handleClose}
              nanocredit={transaction.nanocredit}
            />
          </React.Fragment>
        )}
      </Box.Row>
    </TableCell>
  );
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

const TransactionTable: React.FC = () => {
  const [pageSize, setPageSize] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const styles = useStyles();

  const skip = page * pageSize;
  const { loading, error, data } = useQuery(CURRENT_USER_TRANSACTIONS, {
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
      transactionCount,
      transactions: { edges },
    } = data.currentUser;
    const transactions = edges.map((el: TransactionEdge) => el.node);
    return (
      <Paper className={styles.paper}>
        <TableContainer className={styles.container}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell classes={{ stickyHeader: styles.stickyHeader }}>
                  Date
                </TableCell>
                <TableCell
                  classes={{ stickyHeader: styles.stickyHeader }}
                  align="left"
                >
                  Receipt
                </TableCell>
                <TableCell
                  classes={{ stickyHeader: styles.stickyHeader }}
                  align="right"
                >
                  Amount
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction: Transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell component="th" scope="row">
                    {new Date(transaction.date).toDateString()}
                  </TableCell>
                  <ReceiptCell transaction={transaction} />
                  <AmountCell transaction={transaction} />
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={3}
                count={transactionCount}
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

export default TransactionTable;
