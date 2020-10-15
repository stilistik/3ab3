import React from 'react';
import { Box } from 'Components/index';
import TodoList from './TodoList';
import CreateTodo from './CreateTodo';
import { SINGLE_EVENT } from 'Graphql/queries';
import { Event } from 'Graphql/types';
import { Paper, Typography } from '@material-ui/core';

interface PaperHeaderProps {
  title: string;
}

const PaperHeader: React.FC<PaperHeaderProps> = ({ title, children }) => {
  return (
    <Box.Row
      jc="space-between"
      borderBottom={1}
      borderColor="divider"
      px={2}
      py={0.5}
    >
      <Typography variant="h6">{title}</Typography>
      <Box.Row cmrnl={1}>{children}</Box.Row>
    </Box.Row>
  );
};

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
