import React from 'react';
import { Card, CardContent, CardActions, Typography } from '@material-ui/core';
import { LazyLoadingImageDiv } from 'Components/index';
import { DeleteProduct } from './DeleteProduct';
import { EditProduct } from './EditProduct';
import { Product } from 'Graphql/types';

interface ProductItemProps {
  product: Product;
}

export const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <Card>
      <LazyLoadingImageDiv
        src={product.thumbnail}
        width="100%"
        height="200px"
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {product.name}
        </Typography>
        <Typography variant="body2">
          Price: {product.price.toFixed(2)} CHF
        </Typography>
      </CardContent>
      <CardActions>
        <EditProduct product={product} />
        <DeleteProduct product={product} />
      </CardActions>
    </Card>
  );
};
