import React from 'react';
import { Box } from 'Components/index';
import { TodoList } from './TodoList';
import { CreateTodo } from './CreateTodo';
import { SINGLE_EVENT } from 'Graphql/queries';
import { Event } from 'Graphql/types';
import { Paper } from '@material-ui/core';
import { PaperHeader } from '../PaperHeader';

interface TodosProps {
  event: Event;
}

export const Todos: React.FC<TodosProps> = ({ event }) => {
  const refetchQueries = () => [
    { query: SINGLE_EVENT, variables: { eventId: event.id } },
  ];

  return (
    <Paper>
      <PaperHeader title="Todos">
        <CreateTodo eventId={event.id} refetchQueries={refetchQueries} />
      </PaperHeader>
      <Box.Fill p={2}>
        <TodoList todos={event.todos} refetchQueries={refetchQueries} />
      </Box.Fill>
    </Paper>
  );
};
