import React from 'react';
import { Box } from 'Components/index';
import { TodoList } from './TodoList';
import { CreateTodo } from './CreateTodo';
import { SINGLE_EVENT } from 'Graphql/queries';
import { Event } from 'Graphql/types';
import { Paper } from '@material-ui/core';
import { PaperHeader } from '../PaperHeader';
import { HelpPopover } from '../HelpPopover';
import { Trans, useTranslation } from 'react-i18next';

interface TodosProps {
  event: Event;
}

export const Todos: React.FC<TodosProps> = ({ event }) => {
  const { t } = useTranslation();
  const refetchQueries = () => [
    { query: SINGLE_EVENT, variables: { eventId: event.id } },
  ];

  return (
    <Paper>
      <PaperHeader title={t('Todos')}>
        <HelpPopover>
          <Trans i18nKey="todoHelpText">
            This todo list helps to keep track of tasks that need to be done for
            the event. Todos have a due date and can also be assigned to members
            who are responsible for completing them.
          </Trans>
        </HelpPopover>
        <CreateTodo eventId={event.id} refetchQueries={refetchQueries} />
      </PaperHeader>
      <Box.Fill p={2}>
        <TodoList todos={event.todos} refetchQueries={refetchQueries} />
      </Box.Fill>
    </Paper>
  );
};
