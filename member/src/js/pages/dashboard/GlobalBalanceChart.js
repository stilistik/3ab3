import React from 'react';
import { TimeLineChart } from 'Components';
import { Paper } from '@material-ui/core';

const data = [
  {
    id: 'balance',
    color: '#5BA05E',
    data: [
      {
        x: 0,
        y: 350,
        date: new Date('2015-03-22'),
      },
      {
        x: 1,
        y: 255,
        date: new Date('2015-03-22'),
      },
      {
        x: 2,
        y: 155,
        date: new Date('2015-03-22'),
      },
      {
        x: 3,
        y: 605,
        date: new Date('2015-03-22'),
      },
      {
        x: 4,
        y: 255,
        date: new Date('2015-03-22'),
      },
      {
        x: 5,
        y: 895,
        date: new Date('2015-03-22'),
      },
      {
        x: 6,
        y: 785,
        date: new Date('2015-03-22'),
      },
      {
        x: 7,
        y: 995,
        date: new Date('2015-03-22'),
      },
      {
        x: 8,
        y: 565,
        date: new Date('2015-03-22'),
      },
      {
        x: 9,
        y: 1205,
        date: new Date('2015-03-22'),
      },
      {
        x: 10,
        y: 455,
        date: new Date('2015-03-22'),
      },
      {
        x: 11,
        y: 704,
        date: new Date('2015-03-22'),
      },
      {
        x: 12,
        y: 644,
        date: new Date('2015-03-22'),
      },
      {
        x: 13,
        y: 234,
        date: new Date('2015-03-22'),
      },
      {
        x: 14,
        y: 102,
        date: new Date('2015-03-22'),
      },
      {
        x: 15,
        y: 444,
        date: new Date('2015-03-22'),
      },
    ],
  },
];

export const GlobalBalanceChart = () => {
  return (
    <Paper style={{ width: '100%', height: '300px', color: 'white' }}>
      <TimeLineChart data={data} />
    </Paper>
  );
};
