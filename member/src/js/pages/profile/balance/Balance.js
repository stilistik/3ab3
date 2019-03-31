import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import BalanceChart from './BalanceChart';

export const BALANCE = gql`
  query {
    currentUser {
      id
      balance
      transactions(first: 5) {
        id
        date
        balance
      }
    }
  }
`;

class Balance extends React.Component {
  createChartData = (transactions) => {
    const data = transactions.map((transaction) => {
      const { date, ...rest } = transaction;
      return {
        date: new Date(date),
        ...rest,
      };
    });
    return data.reverse();
  };

  render() {
    const { user } = this.props;
    if (!user) return null;

    let color;
    if (user.balance < 30) color = '#5ba05e';
    else if (user.balance >= 30 && user.balance <= 60) color = '#ffa000';
    else color = '#cc4949';

    const data = this.createChartData(user.transactions);
    return <BalanceChart data={data} color={color} />;
  }
}

export default graphql(BALANCE, {
  props: ({ data }) => ({ user: data.currentUser }),
})(Balance);
