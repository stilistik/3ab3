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

class TablePagination extends React.Component {
  handleFirstPageButtonClick = (event) => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = (event) => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = (event) => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = (event) => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1)
    );
  };

  render() {
    console.log(this.props);
    const { count, page, rowsPerPage } = this.props;

    return (
      <TableRow>
        <td colSpan={this.props.colSpan}>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <IconButton
              onClick={this.handleFirstPageButtonClick}
              disabled={page === 0}
              aria-label="First Page"
            >
              <FirstPageIcon />
            </IconButton>
            <IconButton
              onClick={this.handleBackButtonClick}
              disabled={page === 0}
              aria-label="Previous Page"
            >
              <KeyboardArrowLeft />
            </IconButton>
            <Typography style={{ margin: '0px 15px' }}>{page}</Typography>
            <IconButton
              onClick={this.handleNextButtonClick}
              disabled={page >= Math.ceil(count / rowsPerPage) - 1}
              aria-label="Next Page"
            >
              <KeyboardArrowRight />
            </IconButton>
            <IconButton
              onClick={this.handleLastPageButtonClick}
              disabled={page >= Math.ceil(count / rowsPerPage) - 1}
              aria-label="Last Page"
            >
              <LastPageIcon />
            </IconButton>
          </div>
        </td>
      </TableRow>
    );
  }
}

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

  const onChangePage = (event, page) => {
    setPage(page);
  };

  const onChangePageSize = (event) => {
    setPage(0);
    setPageSize(event.target.value);
  };

  console.log(data);

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
            rowsPerPage={pageSize}
            page={page}
            onChangePage={onChangePage}
            onChangeRowsPerPage={onChangePageSize}
          />
        </TableFooter>
      </Table>
    </Paper>
  );
};

export default TransactionTable;
