import React from 'react';
import { Typography } from '@material-ui/core';
import { Grid, Box } from 'Components/index';
import CreateMemberForm from './CreateMemberForm';

export const CreateMember: React.FC = () => {
  return (
    <Grid.Default>
      <Box p={2}>
        <Typography variant="h3">
          New Member
        </Typography>
        <CreateMemberForm />
      </Box>
    </Grid.Default>
  );
};
