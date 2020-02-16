import React from 'react';
import { Box, Grid, Message } from 'Components';
import { Typography, Divider } from '@material-ui/core';
import { ChecklistForm } from './ChecklistForm';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const MUTATION = gql`
  mutation($input: PurchaseInput!) {
    createPurchase(input: $input) {
      id
    }
  }
`;

export const Checklist = ({ initValues }) => {
  const [createPurchase] = useMutation(MUTATION);

  const onSubmit = async (values) => {
    try {
      await createPurchase({
        variables: {
          input: {
            userId: values.userId,
            date: values.date,
            items: values.items,
          },
        },
      });
      Message.success('Purchase compeleted!');
    } catch (error) {
      Message.error(error.message);
    }
  };

  return (
    <Box py="20px">
      <Grid.Default>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h5">
              CHECKLIST
            </Typography>
            <Divider />
            <ChecklistForm onSubmit={onSubmit} initValues={initValues} />
          </Grid>
        </Grid>
      </Grid.Default>
    </Box>
  );
};
