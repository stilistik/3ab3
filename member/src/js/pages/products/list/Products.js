import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Grid, Fab, Hidden } from '@material-ui/core';
import { DefaultGrid, Icon } from 'Components';
import ProductCard from './ProductCard';
import CreateCard from './CreateCard';
import { requestRoute } from 'History';

import styles from './Products.css';

const QUERY = gql`
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
          <Grid container spacing={24}>
            <Hidden xsDown>
              <Grid item xs={12} sm={6} lg={4}>
                <CreateCard onClick={this.onCreate} />
              </Grid>
            </Hidden>
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
            <Hidden smUp>
              <Fab
                color="primary"
                className={styles.fab}
                onClick={this.onCreate}
              >
                <Icon type="add" />
              </Fab>
            </Hidden>
          </Grid>
        </div>
      </DefaultGrid>
    );
  }
}

export default graphql(QUERY, {
  props: ({ data }) => ({ products: data.products }),
})(Products);
