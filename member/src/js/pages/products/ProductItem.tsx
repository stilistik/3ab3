import React from 'react';
import { Card, CardContent, CardActions, Typography } from '@material-ui/core';
import { LazyLoadingImageDiv } from 'Components/index';
import { DeleteProduct } from './DeleteProduct';
import { EditProduct } from './EditProduct';
import { Product } from 'Graphql/types';
import { useTranslation } from 'react-i18next';

interface ProductItemProps {
  product: Product;
}

export const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const { t } = useTranslation();
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
          {t('Price')}: {product.price.toFixed(2)} CHF
        </Typography>
      </CardContent>
      <CardActions>
        <EditProduct product={product} />
        <DeleteProduct product={product} />
      </CardActions>
    </Card>
  );
};
