import React from 'react';
import { Typography } from '@material-ui/core';
import { DefaultGrid } from 'Components';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { getQueryParams } from 'History';
import EditProductForm from './EditProductForm';

import styles from './EditProduct.less';

export const QUERY = gql`
  query($productId: ID!) {
    product(productId: $productId) {
      id
      name
      price
      index
      thumbnail
    }
  }
`;

const EditProduct = (props) => {
  const { id } = getQueryParams();
  const { loading, error, data } = useQuery(QUERY, {
    variables: { productId: id },
    fetchPolicy: 'no-cache',
  });

  if (loading || error) return null;

  return (
    <DefaultGrid overflow>
      <div className={styles.container}>
        <Typography variant="h3" className={styles.typo}>
          Edit Product
        </Typography>
        <EditProductForm product={data.product} />
      </div>
    </DefaultGrid>
  );
};

export default EditProduct;
