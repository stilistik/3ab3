import React from 'react';
import { TodoItem } from './TodoItem';
import { Box } from 'Components/index';
import { Typography } from '@material-ui/core';
import { Todo } from 'Graphql/types';
import { useTranslation } from 'react-i18next';

interface TodoListProps {
  todos: Todo[];
  refetchQueries: () => any[];
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  refetchQueries,
}) => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      {todos.length === 0 && (
        <Box.Row jc="center" my={2}>
          <Typography variant="h6">{t('No todos yet')}</Typography>
        </Box.Row>
      )}
      {todos.map((todo, i) => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            refetchQueries={refetchQueries}
            isLastItem={i === todos.length - 1}
          />
        );
      })}
    </React.Fragment>
  );
};
