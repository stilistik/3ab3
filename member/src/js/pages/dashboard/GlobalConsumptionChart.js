import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { PercentagePieChart } from 'Components';
import { Paper } from '@material-ui/core';

const QUERY = gql`
  query {
    consumptions {
      count
      product {
        id
        name
      }
    }
  }
`;

const GlobalConsumptionChart = () => {
  const { loading, error, data } = useQuery(QUERY);

  if (loading || error) return null;

  const createChartData = (consumptions) => {
    return consumptions.map((consumption) => {
      return {
        value: consumption.count,
        label: consumption.product.name,
        id: consumption.product.name,
      };
    });
  };

  return (
    <Paper style={{ width: '100%', height: '340px', color: 'white' }}>
      <PercentagePieChart data={createChartData(data.consumptions)} />
    </Paper>
  );
};

export default GlobalConsumptionChart;
