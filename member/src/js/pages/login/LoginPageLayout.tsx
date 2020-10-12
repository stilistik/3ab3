import React from 'react';
import { Grid, Box } from 'Components/index';

export const LoginPageLayout: React.FC = ({ children }) => {
  return (
    <Box pt="10vh">
      <Grid container justify="center">
        <Grid item xs={9} sm={6} md={4} lg={3} xl={2}>
          {children}
        </Grid>
      </Grid>
    </Box>
  );
};
