import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Box, Loading, Error } from 'Components';
import MemberItem from '../MemberItem';
import CreateButton from '../create/CreateButton';
import { requestRoute } from 'History';

export const MEMBERS = gql`
  query {
    users {
      id
      name
      role
      email
      avatar
    }
  }
`;

export const Members = () => {
  const { loading, error, data } = useQuery(MEMBERS);

  if (error) return <Error message={error.message} />;
  if (loading) return <Loading />;

  const onCreate = () => {
    requestRoute('/members/create');
  };

  const onEdit = (userId) => {
    requestRoute('/members/edit', {
      id: userId,
    });
  };

  return (
    <Grid.Default>
      <Box py="20px">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} lg={4}>
            <CreateButton onClick={onCreate} />
          </Grid>
          {data.users.map((user) => {
            return (
              <Grid key={user.id} item xs={12} sm={6} lg={4}>
                <MemberItem user={user} onClick={onEdit} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Grid.Default>
  );
};

export default Members;
