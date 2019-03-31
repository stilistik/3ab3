import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import ProductsChart from './ProductsChart';

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
    return <ProductsChart data={data} />;
  }
}

export default graphql(PRODUCTS, {
  props: ({ data }) => ({ consumptions: data.consumptions }),
})(Products);
