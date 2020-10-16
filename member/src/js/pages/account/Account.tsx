import React from 'react';
import { AccountForm } from './AccountForm';
import { Typography, Paper } from '@material-ui/core';
import { Box, Grid, useCurrentUser } from 'Components/index';

export const Account: React.FC = () => {
  const user = useCurrentUser();
  return (
    <Grid.Default>
      <Box py={2} cmb={2}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Paper>
              <Box p={2}>
                <Typography variant="h4">{user.name}</Typography>
                <AccountForm user={user} />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Grid.Default>
  );
};
