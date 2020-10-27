import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { TimeLineChart } from 'Components';
import { Paper } from '@material-ui/core';
import { getBalanceColorClass } from 'Components/utility/Utils';
import { BALANCE_CHART } from 'Graphql/queries';

export const BalanceChart = () => {
  const { loading, error, data } = useQuery(BALANCE_CHART);

  if (loading || error) return null;

  const createChartData = (transactions, color) => {
    const data = transactions.edges
      .slice()
      .reverse()
      .map((el, index) => {
        const { date, balance } = el.node;
        return {
          x: index,
          y: balance,
          date: date,
        };
      });
    return [{ id: 'balance', color: color, data: data }];
  };

  const { balance, transactions } = data.currentUser;
  const { color } = getBalanceColorClass(balance);

  return (
    <Paper style={{ width: '100%', height: '340px', color: 'white' }}>
      <TimeLineChart data={createChartData(transactions, color)} />
    </Paper>
  );
};

export default BalanceChart;
