import React from 'react';
import { Button } from '@material-ui/core';
import { Form, Field } from 'Components';

import styles from './PaymentForm.css';

class PaymentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  onChange = (e) => {
    this.setState({ value: e.target.value });
  };

  render() {
    return (
      <Form onSubmit={this.props.onSubmit} className={styles.form}>
        <Field
          className={styles.field}
          id="amount"
          name="Amount"
          type="number"
          value={this.state.value}
          onChange={this.onChange}
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

export default PaymentForm;
