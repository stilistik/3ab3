import React from 'react';
import { Grid, Divider, Typography, Box } from '@material-ui/core';
import { DefaultGrid, Form, TextField } from 'Components';
import { getQueryParams } from 'History';

export const ResetPassword = () => {
  React.useEffect(() => {
    const params = getQueryParams();
    console.log(params);
  }, []);

  const onSubmit = () => {};

  return (
    <DefaultGrid overflow>
      <Box p="20px">
        <Grid container>
          <Grid item sm={6}>
            <Typography variant="h5">RESET PASSWORD</Typography>
            <Divider />
            <Box py="20px">
              <Form onSubmit={onSubmit}>
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  required={true}
                />
                <TextField
                  id="confirm"
                  label="Confirm Password"
                  type="password"
                  required={true}
                />
              </Form>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </DefaultGrid>
  );
};
