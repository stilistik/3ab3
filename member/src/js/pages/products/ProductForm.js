import React from 'react';
import { TextField, Grid, Button } from '@material-ui/core';

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

  submit = (e) => {
    e.preventDefault();
    const values = {
      name: this.state.name,
      price: parseFloat(this.state.price),
      index: parseInt(this.state.index),
    };
    this.props.onSubmit(values);
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
          <form className={styles.form} onSubmit={this.submit}>
            <TextField
              name="name"
              label="Name"
              margin="normal"
              value={this.state.name}
              onChange={this.onChange}
            />
            <TextField
              name="price"
              label="Price"
              margin="normal"
              value={this.state.price}
              onChange={this.onChange}
            />
            <TextField
              name="index"
              label="Index"
              margin="normal"
              type="number"
              value={this.state.index}
              onChange={this.onChange}
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
          </form>
        </Grid>
      </Grid>
    );
  }
}

export default ProductForm;
