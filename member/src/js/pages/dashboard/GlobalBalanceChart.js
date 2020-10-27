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

  const totalTransactionValue = data.transactions.edges
    .map((el) => {
      if (el.node.type === 'PURCHASE') return -el.node.purchase.total;
      else if (el.node.type === 'PAYMENT') return +el.node.payment.amount;
    })
    .reduce((acc, curr) => acc + curr, 0);

  let value = totalBalance - totalTransactionValue;

  const d = data.transactions.edges
    .slice()
    .reverse()
    .map((el, idx) => {
      if (el.node.type === 'PURCHASE') value -= el.node.purchase.total;
      else if (el.node.type === 'PAYMENT') value += el.node.payment.amount;
      return {
        x: idx,
        y: value,
        date: new Date(el.node.date),
      };
    });

  const lastValue = d.slice(-1)[0];
  const { color } = getBalanceColorClass(lastValue.y);

  const chartData = [
    {
      id: 'balance',
      data: d,
      color: color,
    },
  ];

  return (
    <Paper style={{ width: '100%', height: '300px', color: 'white' }}>
      <TimeLineChart data={chartData} />
    </Paper>
  );
};
