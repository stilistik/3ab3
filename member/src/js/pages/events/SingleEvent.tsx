import React from 'react';
import { getQueryParams, updateParams } from 'App/router/History';
import { useQuery } from 'react-apollo';
import { Loading, Error, Grid, Box } from 'Components/index';
import { SINGLE_EVENT } from 'Graphql/queries';

export const SingleEvent: React.FC = () => {
  const { id } = getQueryParams();

  React.useEffect(() => {
    return () => updateParams({ id: undefined });
  }, []);

  const { loading, error, data } = useQuery(SINGLE_EVENT, {
    variables: { eventId: id },
  });

  if (error) return <Error message={error.message} />;
  if (loading) return <Loading />;

  return (
    <Grid.Default>
      <h1>info</h1>
    </Grid.Default>
  );
};
