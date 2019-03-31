import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Grid } from '@material-ui/core';
import ProductsChart from './ProductsChart';

import styles from './Products.css';

const PRODUCTS = gql`
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

class Products extends React.Component {
  createChartData = (consumptions) => {
    return consumptions.map((consumption) => {
      return {
        count: consumption.count,
        product: consumption.product.name,
      };
    });
  };

  render() {
    const { consumptions } = this.props;
    if (!consumptions) return null;
    const data = this.createChartData(consumptions);
    return (
      <div className={styles.container}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <ProductsChart data={data} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default graphql(PRODUCTS, {
  props: ({ data }) => ({ consumptions: data.consumptions }),
})(Products);
