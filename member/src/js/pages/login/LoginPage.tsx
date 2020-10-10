import React from 'react';
import { Box, Grid } from 'Components/index';
import { LoginForm } from './LoginForm';

export const LoginPage: React.FC = () => {
  return (
    <Box pt="10vh">
      <Grid container justify="center">
        <Grid item xs={9} sm={6} md={4} lg={3} xl={2}>
          <LoginForm />
        </Grid>
      </Grid>
    </Box>
  );
};
