import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Grid, Box, Loading, Error } from 'Components';
import TodoList from './TodoList';
import CreateTodo from './CreateTodo';

const Todos = ({ eventId }) => {
  const { loading, error, data } = useQuery(TODOS, {
    variables: { eventId: eventId },
  });

  if (error) return <Error message={error.message} />;
  if (loading) return <Loading />;

  const { event } = data;
  return (
    <Box w="100%" o="hidden" py="20px">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <CreateTodo
            eventId={event.id}
            refetch={[{ query: TODOS, variables: { eventId: event.id } }]}
          />
        </Grid>
        <Grid item xs={12}>
          <TodoList
            todos={event.todos}
            refetch={[{ query: TODOS, variables: { eventId: event.id } }]}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Todos;
