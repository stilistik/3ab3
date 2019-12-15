import React from 'react';
import { Button } from '@material-ui/core';
import { Form, NumberField } from 'Components';

import styles from './PaymentForm.css';

const PaymentForm = ({ onSubmit }) => {
  return (
    <Form onSubmit={onSubmit} className={styles.form}>
      <NumberField
        className={styles.field}
        id="amount"
        name="Amount"
        type="number"
      />
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default PaymentForm;
