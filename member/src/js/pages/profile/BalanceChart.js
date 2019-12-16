import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { TimeLineChart } from 'Components';
import { Paper } from '@material-ui/core';
import { Utils } from 'Utils';

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
    return [{ id: 'balance', color: color, data: data }];
  };

  const { balance, transactions } = data.currentUser;
  const { color } = Utils.getBalanceColorClass(balance);

  console.log(color);

  return (
    <Paper style={{ width: '100%', height: '340px', color: 'white' }}>
      <TimeLineChart data={createChartData(transactions, color)} />
    </Paper>
  );
};

export default BalanceChart;
