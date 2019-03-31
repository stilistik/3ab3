import React from 'react';
import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  TablePagination,
  IconButton,
} from '@material-ui/core';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

const TRANSACTIONS = gql`
  query {
    currentUser {
      id
      transactions {
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
`;

class TablePaginationActions extends React.Component {
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
    const { count, page, rowsPerPage } = this.props;

    return (
      <div style={{ width: '100%' }}>
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

class TransactionTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rowsPerPage: 5,
      page: 0,
    };
  }

  onChangePage = (event, page) => {
    this.setState({ page });
  };

  onChangeRowsPerPage = (event) => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  getPaginatedTransactions = (transactions) => {
    const { page, rowsPerPage } = this.state;
    return transactions.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  };

  render() {
    if (!this.props.user) return null;
    const { transactions } = this.props.user;
    const rows = this.getPaginatedTransactions(transactions);
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
            {rows.map((transaction) => (
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
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={3}
                count={transactions.length}
                rowsPerPage={this.state.rowsPerPage}
                page={this.state.page}
                onChangePage={this.onChangePage}
                onChangeRowsPerPage={this.onChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Paper>
    );
  }
}

export default graphql(TRANSACTIONS, {
  props: ({ data }) => ({ user: data.currentUser }),
})(TransactionTable);
