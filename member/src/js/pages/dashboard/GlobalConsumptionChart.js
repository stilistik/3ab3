import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { PercentagePieChart } from 'Components';
import { Paper } from '@material-ui/core';

const data = [
  {
    value: 124,
    label: 'Junker',
    id: 'Junker',
  },
  {
    value: 45,
    label: 'Lager',
    id: 'Lager',
  },
  {
    value: 322,
    label: 'Bugel',
    id: 'Bugel',
  },
  {
    value: 12,
    label: 'Makava',
    id: 'Makava',
  },
  {
    value: 98,
    label: 'Premium Cola',
    id: 'Premium Cola',
  },
  {
    value: 144,
    label: 'Special Drink',
    id: 'Special Drink',
  },
];

const GlobalConsumptionChart = () => {
  return (
    <Paper style={{ width: '100%', height: '340px', color: 'white' }}>
      <PercentagePieChart data={data} />
    </Paper>
  );
};

export default GlobalConsumptionChart;
