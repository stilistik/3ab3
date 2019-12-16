import React from 'react';
import { Grid, Button } from '@material-ui/core';
import {
  Form,
  DateField,
  UserSelectField,
  QuickNumberField,
  Container,
  Center,
} from 'Components';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const QUERY = gql`
  query {
    products {
      id
      name
      price
      index
    }
  }
`;

export const ChecklistForm = ({ initValues, ...rest }) => {
  const { loading, error, data } = useQuery(QUERY);
  if (loading || error) return null;

  const onSubmit = (values) => {
    const { date, user, ...products } = values;
    const items = Object.keys(products).map((key) => ({
      productId: key,
      amount: products[key],
    }));
    rest.onSubmit({ date, userId: user.id, items });
  };

  const { products } = data;
  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <DateField id="date" label="Date" required={true} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <UserSelectField id="user" label="Member" required={true} />
          </Grid>
          {products.map((product) => {
            return (
              <Grid key={product.id} item xs={12} sm={6} md={4}>
                <QuickNumberField
                  id={product.id}
                  label={product.name}
                  required={false}
                />
              </Grid>
            );
          })}
          <Grid item xs={12}>
            <Center>
              <Button type="submit" variant="contained" color="secondary">
                Submit
              </Button>
            </Center>
          </Grid>
        </Grid>
      </Form>
    </Container>
  );
};
