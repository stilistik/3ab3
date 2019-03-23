import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { ImageField, TextField, Field, DateField, Form } from 'Components';

import styles from './EventForm.css';

class ProductForm extends React.Component {
  onSubmit = (values) => {
    this.props.onSubmit(values);
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
              id="title"
              name="Title"
              required={true}
              className={styles.field}
            />
            <TextField
              id="description"
              name="Description"
              required={true}
              className={styles.field}
            />
            <DateField
              id="date"
              name="Date"
              type="date"
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
