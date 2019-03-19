import React from 'react';
import { DefaultGrid } from 'Components';
import CreateProductForm from './CreateProductForm';

import styles from './CreateProduct.css';

class CreateProduct extends React.Component {
  render() {
    return (
      <DefaultGrid overflow>
        <div className={styles.container}>
          <CreateProductForm />
        </div>
      </DefaultGrid>
    );
  }
}

export default CreateProduct;
