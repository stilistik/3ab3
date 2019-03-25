import React from 'react';
import { Paper } from '@material-ui/core';
import { TrendChart } from 'Components';

import styles from './BalanceChart.css';

const data = [
  {
    id: 'a',
    date: new Date('2017-05-22'),
    balance: 120,
  },
  {
    id: 'b',
    date: new Date('2017-08-13'),
    balance: 78,
  },
  {
    id: 'c',
    date: new Date('2017-09-10'),
    balance: 55,
  },
  {
    id: 'd',
    date: new Date('2017-11-21'),
    balance: 120,
  },
  {
    id: 'e',
    date: new Date('2018-03-12'),
    balance: 210,
  },
];

const BalanceChart = ({ user }) => {
  let cls;
  if (user.balance < 30) cls = 'low';
  else if (user.balance >= 30 && user.balance <= 60) cls = 'medium';
  else cls = 'high';
  return (
    <Paper className={styles[cls]}>
      <TrendChart data={data} onClick={() => {}} />
    </Paper>
  );
};

export default BalanceChart;
