import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Box, Loading, Error } from 'Components/index';
import MemberItem from './MemberItem';
import { USER_LIST } from 'Graphql/queries';
import { User } from 'Graphql/types';
import { CreateMember } from './CreateMember';

export const MemberList: React.FC = () => {
  const { loading, error, data } = useQuery(USER_LIST);

  if (error) return <Error message={error.message} />;
  if (loading) return <Loading />;

  return (
    <Grid.Default>
      <Box py="20px">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CreateMember />
          </Grid>
          {data.users.map((user: User) => {
            return (
              <Grid key={user.id} item xs={12} sm={6} lg={4}>
                <MemberItem user={user} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Grid.Default>
  );
};
