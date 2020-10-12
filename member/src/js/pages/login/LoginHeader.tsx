import React from 'react';
import { Typography } from '@material-ui/core';
import { Box } from 'Components/index';

export const LoginHeader: React.FC = () => {
  return (
    <React.Fragment>
      <Box.Row jc="center" color="#f2f2f2">
        <Typography variant="h3">Login</Typography>
      </Box.Row>
      <br />
    </React.Fragment>
  );
};
