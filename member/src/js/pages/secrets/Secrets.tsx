import React from 'react';
import { Loading, Error, Box, Grid } from 'Components/index';
import { SECRETS } from 'Graphql/queries';
import { useQuery } from 'react-apollo';
import { Secret } from 'Graphql/types';
import { CreateSecret } from './CreateSecret';
import { SecretItem } from './SecretItem';

export const Secrets: React.FC = () => {
  const { loading, error, data } = useQuery(SECRETS);

  if (error) return <Error message={error.message} />;
  if (loading) return <Loading />;

  return (
    <Grid.Default>
      <Box py="20px">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <CreateSecret />
          </Grid>
          {data.secrets.map((secret: Secret) => {
            return (
              <Grid key={secret.id} item xs={12} sm={6} lg={4}>
                <SecretItem secret={secret} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Grid.Default>
  );
};
