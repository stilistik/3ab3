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
  TableSortLabel,
  Typography,
} from '@material-ui/core';
import {
  TablePagination,
  Tag,
  Box,
  Icon,
  Message,
  UserSelectField,
  Form,
  Grid,
  DateField,
  DeleteConfirmPopover,
} from 'Components/index';
import { useMutation, useQuery } from '@apollo/react-hooks';
import {
  BALANCE_TABLE,
  CURRENT_USER_BALANCE,
  CURRENT_USER_TRANSACTIONS,
  TRANSACTIONS,
} from 'Graphql/queries';
import { Transaction, TransactionEdge } from 'Graphql/types';
import { useTranslation } from 'react-i18next';
import { DELETE_TRANSACTION } from 'Graphql/mutations';
import { FieldChangeEvent } from 'Components/form/types';

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

const DeleteTransaction: React.FC<ActionCellProps> = ({
  transaction,
  refetch,
}) => {
  const [deleteTransaction] = useMutation(DELETE_TRANSACTION);

  const handleDelete = () => {
    deleteTransaction({
      variables: { transactionId: transaction.id },
      refetchQueries: () => [
        { query: CURRENT_USER_BALANCE },
        { query: BALANCE_TABLE },
        { query: CURRENT_USER_TRANSACTIONS, variables: { first: 10, skip: 0 } },
      ],
    })
      .then(() => refetch())
      .then(() => Message.success('Transaction deleted.'))
      .catch((error) => Message.error(error.message));
  };
  return (
    <DeleteConfirmPopover>
      <IconButton onClick={handleDelete}>
        <Icon type="delete" />
      </IconButton>
    </DeleteConfirmPopover>
  );
};

interface ActionCellProps {
  transaction: Transaction;
  refetch: () => Promise<any>;
}

const ActionCell: React.FC<ActionCellProps> = (props) => {
  return (
    <TableCell align="right">
      <Box.Row h="30px">
        <IconButton onClick={() => {}}>
          <Icon type="edit" />
        </IconButton>
        <DeleteTransaction {...props} />
      </Box.Row>
    </TableCell>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    overflow: 'hidden',
    marginTop: theme.spacing(3),
  },
  stickyHeader: {
    backgroundColor: theme.palette.background.paper,
    fontWeight: 'bold',
    color: theme.palette.text.secondary,
  },
}));

interface SortableHeaderCellProps {
  id: string;
  sortId: string;
  label: string;
  order: 'ASC' | 'DESC';
  onClick: (id: string) => void;
}

const SortableHeaderCell: React.FC<SortableHeaderCellProps> = ({
  id,
  sortId,
  order,
  label,
  onClick,
}) => {
  const styles = useStyles();
  return (
    <TableCell classes={{ stickyHeader: styles.stickyHeader }}>
      <TableSortLabel
        active={sortId === id}
        direction={order.toLowerCase() as 'asc' | 'desc'}
        onClick={() => onClick(id)}
      >
        {label}
      </TableSortLabel>
    </TableCell>
  );
};

export const GlobalTransactionTable: React.FC = () => {
  const [pageSize, setPageSize] = React.useState(30);
  const [page, setPage] = React.useState(0);
  const [userId, setUserId] = React.useState<string>(null);
  const [beforeDate, setBeforeDate] = React.useState<string>(null);
  const [afterDate, setAfterDate] = React.useState<string>(null);
  const [sortId, setSortId] = React.useState('date');
  const [order, setOrder] = React.useState<'ASC' | 'DESC'>('DESC');
  const styles = useStyles();
  const { t } = useTranslation();

  function buildWhere() {
    const where: any = {};
    if (userId) {
      where.user = { id: userId };
    }
    if (beforeDate) {
      where.date_lt = beforeDate;
    }
    if (afterDate) {
      where.date_gte = afterDate;
    }
    return where;
  }

  const skip = page * pageSize;
  const { loading, error, data, refetch } = useQuery(TRANSACTIONS, {
    variables: {
      first: pageSize,
      skip: skip,
      orderBy: `${sortId}_${order}`,
      where: buildWhere(),
    },
  });

  const onChangePage = (page: number) => {
    setPage(page);
  };

  const onChangePageSize = (pageSize: number) => {
    setPage(0);
    setPageSize(pageSize);
  };

  const onClickHeader = (id: string) => {
    const isDesc = sortId === id && order === 'DESC';
    setOrder(isDesc ? 'ASC' : 'DESC');
    setSortId(id);
  };

  const handleFieldChange = (event: FieldChangeEvent) => {
    if (event.id === 'user') setUserId(event.value as string);
    if (event.id === 'before') setBeforeDate(event.value as string);
    if (event.id === 'after') setAfterDate(event.value as string);
  };

  if (data) {
    const {
      transactions: { edges },
    } = data;
    const transactions = edges.map((el: TransactionEdge) => el.node);
    return (
      <React.Fragment>
        <Typography variant="subtitle1" color="textPrimary">
          {t('Filters')}
        </Typography>
        <Form onFieldChange={handleFieldChange} onSubmit={() => {}}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <UserSelectField id="user" label={t('Member')} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <DateField id="before" label={t('Before')} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <DateField id="after" label={t('After')} />
            </Grid>
          </Grid>
        </Form>
        <Paper className={styles.paper}>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <SortableHeaderCell
                    id="date"
                    label={t('Date')}
                    onClick={onClickHeader}
                    sortId={sortId}
                    order={order}
                  />
                  <TableCell classes={{ stickyHeader: styles.stickyHeader }}>
                    {t('Member')}
                  </TableCell>
                  <SortableHeaderCell
                    label={t('Amount')}
                    id="change"
                    sortId={sortId}
                    order={order}
                    onClick={onClickHeader}
                  />
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
                    <ActionCell transaction={transaction} refetch={refetch} />
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
      </React.Fragment>
    );
  }

  if (loading || error) return null;
};
