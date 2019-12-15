import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import TimeLineChart from './charts/TimeLineChart';
import { Paper } from '@material-ui/core';

export const BALANCE_QUERY = gql`
  query {
    currentUser {
      id
      balance
      transactions(first: 5) {
        edges {
          node {
            id
            date
            balance
          }
        }
      }
    }
  }
`;

export const BalanceChart = () => {
  const { loading, error, data } = useQuery(BALANCE_QUERY);

  if (loading || error) return null;

  const createChartData = (transactions, color) => {
    const data = transactions.edges.reverse().map((el, index) => {
      const { date, balance } = el.node;
      return {
        x: index,
        y: balance,
        date: date,
      };
    });
    console.log(data);

    return [{ id: 'balance', color: color, data: data }];
  };

  const { balance, transactions } = data.currentUser;

  let color;
  if (balance < 30) color = '#5BA05E';
  else if (balance >= 30 && balance <= 60) color = '#FFA000';
  else color = '#CC4949';

  console.log(color);

  return (
    <Paper style={{ width: '100%', height: '340px', color: 'white' }}>
      <TimeLineChart data={createChartData(transactions, color)} />
    </Paper>
  );
};

export default BalanceChart;
