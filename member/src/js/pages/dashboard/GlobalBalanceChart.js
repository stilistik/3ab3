import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { TimeLineChart } from 'Components';
import { Paper } from '@material-ui/core';
import { getBalanceColorClass } from 'Components/utility/Utils';
import { GLOBAL_BALANCE_CHART } from 'Graphql/queries';

export const GlobalBalanceChart = () => {
  const { loading, error, data } = useQuery(GLOBAL_BALANCE_CHART);

  if (loading || error) return null;
  const totalBalance = data.users
    .map((el) => el.balance)
    .reduce((acc, curr) => acc + curr, 0);
  const transactions = data.transactions.edges.map((edge) => edge.node);

  const createChartData = (transactions, balance) => {
    const data = [];
    transactions.forEach((transaction, index) => {
      data.push({
        x: transactions.length - index,
        y: balance,
        date: transaction.date,
      });
      balance -= transaction.change;
    });

    const lastValue = data[0];
    const { color } = getBalanceColorClass(lastValue.y);

    return [{ id: 'balance', color: color, data: data }];
  };

  const chartData = createChartData(transactions, totalBalance);

  return (
    <Paper style={{ width: '100%', height: '300px', color: 'white' }}>
      <TimeLineChart data={chartData} />
    </Paper>
  );
};
