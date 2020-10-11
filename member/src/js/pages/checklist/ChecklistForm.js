import React from 'react';
import { Button, Avatar } from '@material-ui/core';
import {
  Grid,
  Box,
  Form,
  DateField,
  UserSelectField,
  QuickNumberField,
} from 'Components';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { getBackendUrl } from 'Apollo/Utils';

const QUERY = gql`
  query {
    products {
      id
      name
      price
      index
      thumbnail
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
    <Box py="20px">
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
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    src={getBackendUrl() + product.thumbnail}
                    style={{
                      width: 60,
                      height: 60,
                      marginBottom: 15,
                      marginRight: 10,
                    }}
                  />
                  <QuickNumberField
                    id={product.id}
                    label={product.name}
                    required={false}
                  />
                </div>
              </Grid>
            );
          })}
          <Grid item xs={12}>
            <Box.Row jc="center">
              <Button type="submit" variant="contained" color="secondary">
                Submit
              </Button>
            </Box.Row>
          </Grid>
        </Grid>
      </Form>
    </Box>
  );
};
