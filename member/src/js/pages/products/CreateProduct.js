import React from 'react';
import { DefaultGrid } from 'Components';

import styles from './CreateProduct.css';

export class CreateProduct extends React.Component {
  render() {
    return (
      <DefaultGrid overflow>
        <div className={styles.container}>
          <h1>Create Product</h1>
        </div>
      </DefaultGrid>
    );
  }
}
