import React from 'react';
import { Typography } from '@material-ui/core';
import { Grid } from 'Components';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { getQueryParams } from 'History';
import EditProductForm from './EditProductForm';

import styles from './EditProduct.less';
import { updateParams } from 'History/';

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
  React.useEffect(() => {
    return () => updateParams({ id: undefined });
  }, []);

  const { id } = getQueryParams();
  const { loading, error, data } = useQuery(QUERY, {
    variables: { productId: id },
    fetchPolicy: 'no-cache',
  });

  if (loading || error) return null;

  return (
    <Grid.Default>
      <div className={styles.container}>
        <Typography variant="h3" className={styles.typo}>
          Edit Product
        </Typography>
        <EditProductForm product={data.product} />
      </div>
    </Grid.Default>
  );
};

export default EditProduct;
