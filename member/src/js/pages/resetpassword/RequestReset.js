import React from 'react';
import { Grid, Divider, Typography, Box, Button } from '@material-ui/core';
import { DefaultGrid, Form, TextField, Message } from 'Components';

export const RequestReset = () => {
  const onSubmit = async (payload) => {
    const response = await fetch(global.API_URL + '/oauth/forgot_password', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(payload),
    });
    if (response.ok) {
      Message.success('An email with a password reset link was sent do you.');
    } else {
      Message.error('Could not find your email in the system');
    }
  };

  return (
    <DefaultGrid overflow>
      <Box p="20px">
        <Grid container>
          <Grid item sm={6}>
            <Typography variant="h5">REQUEST PASSWORD RESET</Typography>
            <Divider />
            <Box py="20px">
              <Form onSubmit={onSubmit}>
                <TextField
                  id="email"
                  label="Email"
                  type="email"
                  required={true}
                />
                <Button color="secondary" variant="contained" type="submit">
                  Submit
                </Button>
              </Form>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </DefaultGrid>
  );
};
