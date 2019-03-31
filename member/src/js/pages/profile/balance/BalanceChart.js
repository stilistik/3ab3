import React from 'react';
import { Paper } from '@material-ui/core';
import { TrendChart } from 'Components';

import styles from './BalanceChart.css';

class BalanceChart extends React.Component {
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
    const data = this.createChartData(user.transactions);
    let cls;
    if (user.balance < 30) cls = 'low';
    else if (user.balance >= 30 && user.balance <= 60) cls = 'medium';
    else cls = 'high';

    return (
      <Paper className={styles[cls]}>
        <TrendChart data={data} onClick={() => {}} />
      </Paper>
    );
  }
}

export default BalanceChart;
