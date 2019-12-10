import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Grid } from '@material-ui/core';
import { DefaultGrid, CreateButton } from 'Components';
import ProductCard from './ProductCard';
import { requestRoute } from 'History';

import styles from './Products.css';

export const PRODUCTS = gql`
  query {
    products {
      id
      name
      price
      index
      thumbnail
    }
  }
`;

class Products extends React.Component {
  onCreate = () => {
    requestRoute('/createproduct');
  };

  onEdit = (productId) => {
    requestRoute('/editproduct', {
      id: productId,
    });
  };

  render() {
    if (!this.props.products) return null;
    return (
      <DefaultGrid overflow>
        <div className={styles.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <CreateButton onClick={this.onCreate} />
            </Grid>
            {this.props.products.map((product) => {
              return (
                <Grid key={product.id} item xs={12} sm={6} lg={4}>
                  <ProductCard
                    product={product}
                    onEdit={this.onEdit}
                    onDelete={this.onDelete}
                  />
                </Grid>
              );
            })}
          </Grid>
        </div>
      </DefaultGrid>
    );
  }
}

export default graphql(PRODUCTS, {
  props: ({ data }) => ({ products: data.products }),
})(Products);
