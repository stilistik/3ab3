import React from 'react';
import AvatarUpload from './AvatarUpload';
import { AccountForm } from './AccountForm';
import { Typography } from '@material-ui/core';
import { Box, Grid, userCurrentUser } from 'Components/index';

export const Account: React.FC = () => {
  const user = userCurrentUser();

  return (
    <Grid.Default>
      <Box py={2} cmb={2}>
        <Typography variant="h4">{user.name}</Typography>
        <AvatarUpload style={{ marginRight: '20px' }} />
        <AccountForm user={user} />
      </Box>
    </Grid.Default>
  );
};
