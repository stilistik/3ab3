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
} from '@material-ui/core';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

const TRANSACTIONS = gql`
  query($first: Int!, $skip: Int) {
    currentUser {
      id
      transactions(first: $first, skip: $skip) {
        count
        edges {
          node {
            id
            date
            type
            payment {
              amount
            }
            purchase {
              total
            }
          }
        }
      }
    }
  }
`;

const TablePagination = ({ page, count, pageSize, ...rest }) => {
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
            <Typography style={{ marginRight: 10 }}>Per page:</Typography>
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
  const amount =
    transaction.type === 'PAYMENT'
      ? transaction.payment.amount
      : transaction.purchase.total;
  return <TableCell align="right">{amount.toFixed(2)} CHF</TableCell>;
};

const TransactionTable = () => {
  const [pageSize, setPageSize] = React.useState(10);
  const [page, setPage] = React.useState(0);

  const skip = page * pageSize;

  const { loading, error, data } = useQuery(TRANSACTIONS, {
    variables: { first: pageSize, skip: skip },
  });

  if (loading || error) return null;

  const onChangePage = (page) => {
    setPage(page);
  };

  const onChangePageSize = (pageSize) => {
    setPage(0);
    setPageSize(pageSize);
  };

  const {
    transactions: { count, edges },
  } = data.currentUser;

  const transactions = edges.map((el) => el.node);
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell component="th" scope="row">
                {new Date(transaction.date).toDateString()}
              </TableCell>
              <TableCell align="right">{transaction.type}</TableCell>
              <AmountCell transaction={transaction} />
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            colSpan={3}
            count={count}
            pageSize={pageSize}
            page={page}
            onChangePage={onChangePage}
            onChangePageSize={onChangePageSize}
          />
        </TableFooter>
      </Table>
    </Paper>
  );
};

export default TransactionTable;