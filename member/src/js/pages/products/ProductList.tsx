import React from 'react';
import { Loading, Error, Grid, Box } from 'Components/index';
import { ProductItem } from './ProductItem';
import { PRODUCT_LIST } from 'Graphql/queries';
import { useQuery } from 'react-apollo';
import { Product } from 'Graphql/types';
import { CreateProduct } from './CreateProduct';

export const ProductList: React.FC = () => {
  const { loading, error, data } = useQuery(PRODUCT_LIST);

  if (error) return <Error message={error.message} />;
  if (loading) return <Loading />;

  return (
    <Grid.Default>
      <Box py="20px">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <CreateProduct />
          </Grid>
          {data.products.map((product: Product) => {
            return (
              <Grid key={product.id} item xs={12} sm={6} lg={4}>
                <ProductItem product={product} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Grid.Default>
  );
};
