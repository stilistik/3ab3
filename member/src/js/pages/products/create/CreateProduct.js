import React from 'react';
import { DefaultGrid } from 'Components';
import { Typography } from '@material-ui/core';
import CreateProductForm from './CreateProductForm';

import styles from './CreateProduct.less';

const CreateProduct = () => {
  return (
    <DefaultGrid overflow>
      <div className={styles.container}>
        <Typography variant="h3" className={styles.typo}>
          New Product
        </Typography>
        <CreateProductForm />
      </div>
    </DefaultGrid>
  );
};

export default CreateProduct;
