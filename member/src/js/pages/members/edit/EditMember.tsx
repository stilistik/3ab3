import React from 'react';
import { Box, Grid } from 'Components/index';
import { Typography } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import { getQueryParams, updateParams } from 'History/index';
import { SINGLE_USER } from 'Graphql/queries';
import { EditMemberForm } from './EditMemberForm';

export const EditMember: React.FC = () => {
  const { id } = getQueryParams();

  React.useEffect(() => {
    return () => updateParams({ id: undefined });
  }, []);

  const { loading, error, data } = useQuery(SINGLE_USER, {
    variables: { userId: id },
    fetchPolicy: 'no-cache',
  });

  if (loading || error) return null;

  return (
    <Grid.Default>
      <Box p={2}>
        <Typography variant="h3">Edit Member</Typography>
        <EditMemberForm user={data.user} />
      </Box>
    </Grid.Default>
  );
};
