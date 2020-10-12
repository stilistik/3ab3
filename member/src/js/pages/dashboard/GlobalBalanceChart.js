import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { TimeLineChart } from 'Components';
import { Paper } from '@material-ui/core';
import gql from 'graphql-tag';

const QUERY = gql`
  query {
    users {
      id
      balance
    }
    transactions(first: 15) {
      edges {
        node {
          id
          type
          date
          purchase {
            id
            total
          }
          payment {
            id
            amount
          }
        }
      }
    }
  }
`;

export const GlobalBalanceChart = () => {
  const { loading, error, data } = useQuery(QUERY);

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

  const chartData = [
    {
      id: 'balance',
      color: '#5BA05E',
      data: d,
    },
  ];

  return (
    <Paper style={{ width: '100%', height: '300px', color: 'white' }}>
      <TimeLineChart data={chartData} />
    </Paper>
  );
};
