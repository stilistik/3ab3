import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { TimeLineChart } from 'Components/index';
import { Paper } from '@material-ui/core';
import { getBalanceColorClass } from 'Components/utility/Utils';
import { BALANCE_CHART } from 'Graphql/queries';
import { Transaction, TransactionEdge } from 'Graphql/types';

interface BalanceChartData {
  x: number;
  y: number;
  date: string;
}

export const BalanceChart: React.FC = () => {
  const { loading, error, data } = useQuery(BALANCE_CHART);

  if (loading || error) return null;

  const { currentUser } = data;
  const { balance } = currentUser;
  const transactions = currentUser.transactions.edges.map(
    (edge: TransactionEdge) => edge.node
  );

  const createChartData = (
    transactions: Transaction[],
    balance: number,
    color: string
  ) => {
    const data: BalanceChartData[] = [];
    transactions.forEach((transaction, index) => {
      data.push({
        x: transactions.length - index,
        y: balance,
        date: transaction.date,
      });
      balance -= transaction.change;
    });

    return [{ id: 'balance', color: color, data: data }];
  };

  const { color } = getBalanceColorClass(balance);
  const chartData = createChartData(transactions, balance, color);
  return (
    <Paper style={{ width: '100%', height: '340px', color: 'white' }}>
      <TimeLineChart data={chartData} />
    </Paper>
  );
};

export default BalanceChart;
