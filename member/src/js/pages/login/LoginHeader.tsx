import React from 'react';
import { Typography } from '@material-ui/core';
import { Box } from 'Components/index';

export const LoginHeader: React.FC = () => {
  return (
    <Box.Row jc="center" color="#f2f2f2" mb={4}>
      <Typography variant="h3">Login</Typography>
    </Box.Row>
  );
};
