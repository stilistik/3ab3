import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { ImageField, TextField, NumberField, Form } from 'Components';

import styles from './ProductForm.css';

const ProductForm = ({ initValues, ...rest }) => {
  const onSubmit = (values) => {
    rest.onSubmit(values);
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={6}>
        <Form
          className={styles.form}
          onSubmit={onSubmit}
          initValues={initValues}
          initAfterSubmit={true}
        >
          <ImageField
            className={styles.imagefield}
            id="thumbnail"
            type="image"
            required={true}
            label="Product Image"
          />
          <TextField
            id="name"
            label="Name"
            required={true}
            className={styles.field}
          />
          <NumberField
            id="price"
            label="Price"
            required={true}
            step={0.5}
            className={styles.field}
          />
          <NumberField
            id="index"
            label="Index"
            required={true}
            className={styles.field}
          />
          <br />
          <Button
            type="submit"
            variant="contained"
            size="large"
            color="primary"
          >
            Submit
          </Button>
        </Form>
      </Grid>
    </Grid>
  );
};

export default ProductForm;
