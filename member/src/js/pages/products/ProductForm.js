import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { ImageField, Field, Form } from 'Components';

import styles from './ProductForm.css';

class ProductForm extends React.Component {
  onSubmit = (values) => {
    const formattedValues = {
      name: values.name,
      price: parseFloat(values.price),
      index: parseInt(values.index),
      image: values.image,
    };
    this.props.onSubmit(formattedValues);
  };

  render() {
    return (
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Form
            className={styles.form}
            onSubmit={this.onSubmit}
            initValues={this.props.initValues}
          >
            <ImageField
              className={styles.imagefield}
              id="image"
              type="image"
              required={true}
              name="Product Image"
            />
            <Field
              id="name"
              name="Name"
              type="alpha"
              required={true}
              className={styles.field}
            />
            <Field
              id="price"
              name="Price"
              type="float"
              required={true}
              className={styles.field}
            />
            <Field
              id="index"
              name="Index"
              type="integer"
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
  }
}

export default ProductForm;
