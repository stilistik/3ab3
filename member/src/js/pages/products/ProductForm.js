import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { ImageField, Field, Form } from 'Components';

import styles from './ProductForm.css';

class ProductForm extends React.Component {
  constructor(props) {
    super(props);
    if (props.product) {
      this.state = {
        name: props.product.name,
        price: props.product.price,
        index: props.product.index,
      };
    } else {
      this.state = {
        name: '',
        price: '',
        index: '',
      };
    }
  }

  onSubmit = (values) => {
    const formattedValues = {
      name: values.name,
      price: parseFloat(values.price),
      index: parseInt(values.index),
    };
    this.props.onSubmit(formattedValues);
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
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
            <ImageField id="thumbnail" name="Product Image" />
            <Field
              id="name"
              name="Name"
              required={true}
              className={styles.field}
            />
            <Field
              id="price"
              name="price"
              label="Price"
              required={true}
              className={styles.field}
            />
            <Field
              id="index"
              name="index"
              label="Index"
              type="number"
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
