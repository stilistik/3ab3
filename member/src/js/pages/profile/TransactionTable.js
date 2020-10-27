import React from 'react';
import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  Typography,
  IconButton,
  Hidden,
  Select,
  MenuItem,
  makeStyles,
  TableContainer,
} from '@material-ui/core';
import { Tag, Box, Icon } from 'Components';
import { useQuery } from '@apollo/react-hooks';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { PurchaseReceipt } from './PurchaseReceipt';
import { NanoCreditReceipt } from './NanoCreditReceipt';
import { useTranslation } from 'react-i18next';
import { TRANSACTIONS } from 'Graphql/queries';

const TablePagination = ({ page, count, pageSize, ...rest }) => {
  const { t } = useTranslation();

  const handleFirstPageButtonClick = () => {
    rest.onChangePage(0);
  };

  const handleBackButtonClick = () => {
    rest.onChangePage(page - 1);
  };

  const handleNextButtonClick = () => {
    rest.onChangePage(page + 1);
  };

  const handleLastPageButtonClick = () => {
    rest.onChangePage(Math.max(0, Math.ceil(count / pageSize) - 1));
  };

  const handlePageSizeChange = (e) => {
    rest.onChangePageSize(e.target.value);
  };

  const pageCount = Math.ceil(count / pageSize) - 1;

  return (
    <TableRow>
      <td colSpan={rest.colSpan}>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <IconButton
            onClick={handleFirstPageButtonClick}
            disabled={page === 0}
            aria-label="First Page"
          >
            <FirstPageIcon />
          </IconButton>
          <IconButton
            onClick={handleBackButtonClick}
            disabled={page === 0}
            aria-label="Previous Page"
          >
            <KeyboardArrowLeft />
          </IconButton>
          <Typography style={{ margin: '0px 15px' }}>
            {page} | {pageCount}
          </Typography>
          <IconButton
            onClick={handleNextButtonClick}
            disabled={page >= pageCount}
            aria-label="Next Page"
          >
            <KeyboardArrowRight />
          </IconButton>
          <IconButton
            onClick={handleLastPageButtonClick}
            disabled={page >= pageCount}
            aria-label="Last Page"
          >
            <LastPageIcon />
          </IconButton>
          <Hidden xsDown>
            <Typography style={{ marginRight: 10 }}>
              {t('Per page')}:
            </Typography>
            <Select onChange={handlePageSizeChange} value={pageSize}>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </Hidden>
        </div>
      </td>
    </TableRow>
  );
};

const AmountCell = ({ transaction }) => {
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

const ReceiptCell = ({ transaction }) => {
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

const TransactionTable = () => {
  const [pageSize, setPageSize] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const styles = useStyles();

  const skip = page * pageSize;
  const { loading, error, data } = useQuery(TRANSACTIONS, {
    variables: { first: pageSize, skip: skip },
  });

  const onChangePage = (page) => {
    setPage(page);
  };

  const onChangePageSize = (pageSize) => {
    setPage(0);
    setPageSize(pageSize);
  };

  if (data) {
    const {
      transactionCount,
      transactions: { edges },
    } = data.currentUser;
    const transactions = edges.map((el) => el.node);
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
              {transactions.map((transaction) => (
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
