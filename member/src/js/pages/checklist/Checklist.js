import React from 'react';
import { DefaultGrid, Message } from 'Components';
import { Typography, Grid, Divider } from '@material-ui/core';
import { ChecklistForm } from './ChecklistForm';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import styles from './Checklist.less';

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
    <DefaultGrid overflow>
      <Grid container>
        <Grid item xs={12}>
          <div className={styles.header}>
            <Typography variant="h5" className={styles.typo}>
              CHECKLIST
            </Typography>
            <Divider />
          </div>
          <ChecklistForm onSubmit={onSubmit} initValues={initValues} />
        </Grid>
      </Grid>
    </DefaultGrid>
  );
};
