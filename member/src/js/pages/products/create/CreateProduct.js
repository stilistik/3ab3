import React from 'react';
import { Grid } from 'Components';
import { Typography } from '@material-ui/core';
import CreateProductForm from './CreateProductForm';

import styles from './CreateProduct.less';

const CreateProduct = () => {
  return (
    <Grid.Default>
      <div className={styles.container}>
        <Typography variant="h3" className={styles.typo}>
          New Product
        </Typography>
        <CreateProductForm />
      </div>
    </Grid.Default>
  );
};

export default CreateProduct;
