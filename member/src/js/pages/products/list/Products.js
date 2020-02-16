import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Grid, Box, CreateButton } from 'Components';
import ProductCard from './ProductCard';
import { requestRoute } from 'History';

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
    requestRoute('/products/create');
  };

  onEdit = (productId) => {
    requestRoute('/products/edit', {
      id: productId,
    });
  };

  render() {
    if (!this.props.products) return null;
    return (
      <Grid.Default>
        <Box py="20px">
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
        </Box>
      </Grid.Default>
    );
  }
}

export default graphql(PRODUCTS, {
  props: ({ data }) => ({ products: data.products }),
})(Products);
