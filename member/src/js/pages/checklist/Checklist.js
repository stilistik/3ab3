import React from 'react';
import { Box, Grid, Message } from 'Components';
import { Typography, Divider } from '@material-ui/core';
import { ChecklistForm } from './ChecklistForm';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useTranslation } from 'react-i18next';

const MUTATION = gql`
  mutation($input: PurchaseInput!) {
    createPurchase(input: $input) {
      id
    }
  }
`;

export const Checklist = ({ initValues = {} }) => {
  const { t } = useTranslation();
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
      Message.success(t('Purchase compeleted'));
    } catch (error) {
      Message.error(error.message);
    }
  };

  return (
    <Grid.Default>
      <Box py="20px">
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h5" color="textPrimary">
              {t('Checklist').toUpperCase()}
            </Typography>
            <Divider />
            <ChecklistForm onSubmit={onSubmit} initValues={initValues} />
          </Grid>
        </Grid>
      </Box>
    </Grid.Default>
  );
};
