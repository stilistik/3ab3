import React from 'react';
import {
  Box,
  Form,
  Message,
  NumberField,
  UserSelectField,
} from 'Components/index';
import { useMutation } from 'react-apollo';
import { Paper, Button, Typography } from '@material-ui/core';
import { FieldOptions, Serializable } from 'Components/form/types';
import { CREATE_PAYMENT } from 'Graphql/mutations';
import { GLOBAL_BALANCE_CHART, BALANCE_TABLE } from 'Graphql/queries';

interface PaymentFormProps {
  onSubmit: (
    values: NestedRecord<Serializable>,
    options: NestedRecord<FieldOptions>
  ) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onSubmit }) => {
  return (
    <Form onSubmit={onSubmit}>
      <Box cmb={1}>
        <UserSelectField id="user" label="User" />
        <NumberField id="amount" label="Amount" />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ marginTop: 10 }}
        >
          Register Payment
        </Button>
      </Box>
    </Form>
  );
};

export const RegisterPayment: React.FC = () => {
  const [createPayment] = useMutation(CREATE_PAYMENT);

  const handleSubmit = (values: any) => {
    createPayment({
      variables: {
        input: {
          userId: values.user,
          amount: parseInt(values.amount),
          date: new Date().toISOString(),
        },
      },
      refetchQueries: () => [
        { query: GLOBAL_BALANCE_CHART },
        { query: BALANCE_TABLE },
      ],
    })
      .then(() => Message.success('Payment successfully registered.'))
      .catch((error) => Message.error(error.message));
  };

  return (
    <Paper>
      <Box p={2}>
        <Typography variant="h6">Register Payment</Typography>
        <PaymentForm onSubmit={handleSubmit} />
      </Box>
    </Paper>
  );
};