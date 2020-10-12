import React from 'react';
import Todo from './Todo';
import { Box } from 'Components/index';
import { Paper, Typography } from '@material-ui/core';
import { DocumentNode } from 'graphql';

interface TodoListProps {
  todos: any[];
  refetch: { query: DocumentNode; variables: any }[];
}

export const TodoList: React.FC<TodoListProps> = ({ todos, refetch }) => {
  return (
    <Paper style={{ padding: '20px' }}>
      {todos.length === 0 && (
        <Box.Row jc="center" my={2}>
          <Typography variant="h6">No todos yet</Typography>
        </Box.Row>
      )}
      {todos.map((todo, i) => {
        const index = i + 1;
        return (
          <Todo key={todo.id} todo={{ index, ...todo }} refetch={refetch} />
        );
      })}
    </Paper>
  );
};

export default TodoList;
