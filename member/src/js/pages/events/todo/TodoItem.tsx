import React from 'react';
import { useMutation } from 'react-apollo';
import { Typography, IconButton, makeStyles } from '@material-ui/core';
import { Box, Icon, UserAvatar } from 'Components/index';
import { AssignUser } from './AssignUser';
import { Todo, User } from 'Graphql/types';
import { CHECK_TODO, DELETE_TODO, UNCHECK_TODO } from 'Graphql/mutations';
import clx from 'classnames';

const useIndicatorStyles = makeStyles((theme) => ({
  circle: {
    position: 'relative',
    width: '50px',
    height: '50px',
    borderRadius: '5px',
    border: `1px solid ${theme.palette.divider}`,
    marginRight: '10px',
    fontSize: '17px',
    fontWeight: 'lighter',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.5s ease',
    userSelect: 'none',
  },
  done: {
    color: '#6acc94',
    borderColor: '#6acc94',
    borderRadius: '25px',
  },
}));

interface TodoIndicatorProps {
  done: boolean;
  onClick: (e: React.MouseEvent) => void;
  date: string;
}

const TodoIndicator: React.FC<TodoIndicatorProps> = ({
  done,
  onClick,
  date,
}) => {
  const styles = useIndicatorStyles();
  return (
    <div
      className={clx(styles.circle, { [styles.done]: done })}
      onClick={onClick}
    >
      {done ? <Icon type="done" /> : <DateDisplay date={date} />}
    </div>
  );
};

const useDateDisplayStyles = makeStyles((theme) => ({
  month: {
    position: 'absolute',
    top: '0%',
    left: '0%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '42%',
    background: '#bf3242',
    color: 'white',
    fontSize: '11px',
    fontWeight: 'bold',
    '& span': {
      marginBottom: '-3px',
    },
  },
  day: {
    position: 'absolute',
    top: '40%',
    left: '0%',
    height: '58%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

interface DateDisplayProps {
  date: string;
}

const DateDisplay: React.FC<DateDisplayProps> = ({ date }) => {
  const styles = useDateDisplayStyles();

  const str = new Date(date).toString();
  const month = str.split(' ')[1].toUpperCase();
  const day = str.split(' ')[2];
  return (
    <Box.Row jc="center" mr={2}>
      <div className={styles.month}>
        <span>{month}</span>
      </div>
      <div className={styles.day}>
        <span>{day}</span>
      </div>
    </Box.Row>
  );
};

interface DoneByProps {
  done: boolean;
  doneBy: User;
  doneAt: string;
}

const DoneBy: React.FC<DoneByProps> = ({ done, doneBy, doneAt }) => {
  if (!done) return null;
  return (
    <Box.Row cmrnl={2}>
      <Typography variant="body2">Done by: </Typography>
      <UserAvatar user={doneBy} style={{ width: 30, height: 30 }} />
      <Typography variant="body2">{doneBy.name}</Typography>
      <Typography variant="body2">{new Date(doneAt).toDateString()}</Typography>
    </Box.Row>
  );
};

interface AssigneeProps {
  assigned: User;
}

const Assignee: React.FC<AssigneeProps> = ({ assigned }) => {
  return (
    <Box.Row cmrnl={1}>
      <Typography variant="body2">Assigned:</Typography>
      <UserAvatar style={{ width: 30, height: 30 }} user={assigned} />
      <Typography variant="body2">{assigned.name}</Typography>
    </Box.Row>
  );
};

interface DeleteTodoProps {
  todoId: string;
  refetchQueries: () => any[];
}

const DeleteTodo: React.FC<DeleteTodoProps> = ({ todoId, refetchQueries }) => {
  const [deleteTodo] = useMutation(DELETE_TODO);

  const handleClick = () => {
    deleteTodo({
      variables: { todoId: todoId },
      refetchQueries,
    });
  };

  return (
    <IconButton onClick={handleClick}>
      <Icon type="delete" />
    </IconButton>
  );
};

interface CheckButtonProps {
  onClick: (e: React.MouseEvent) => void;
  done: boolean;
}

const CheckButton: React.FC<CheckButtonProps> = ({ onClick, done }) => {
  const iconType = done ? 'undo' : 'done';
  return (
    <IconButton onClick={onClick}>
      <Icon type={iconType} />
    </IconButton>
  );
};

interface TodoItemProps {
  todo: Todo;
  refetchQueries: () => any[];
  isLastItem: boolean;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  refetchQueries,
  isLastItem,
}) => {
  const [checkTodo] = useMutation(CHECK_TODO);
  const [uncheckTodo] = useMutation(UNCHECK_TODO);

  const { id, text, due, done, doneBy, doneAt, assigned } = todo;

  const handleClick = () => {
    const mutate = done ? uncheckTodo : checkTodo;
    mutate({
      variables: { todoId: todo.id },
      refetchQueries,
    });
  };

  return (
    <Box>
      <Box.Row>
        <TodoIndicator done={done} onClick={handleClick} date={due} />
        <CheckButton done={done} onClick={handleClick} />
        {!done && <AssignUser todoId={id} refetchQueries={refetchQueries} />}
        <DeleteTodo todoId={id} refetchQueries={refetchQueries} />
      </Box.Row>
      <Box
        pl="45px"
        ml="25px"
        pb={1}
        borderLeft={isLastItem ? 0 : 1}
        borderColor="divider"
        cmbnl={1}
      >
        <Typography variant="body1">{text}</Typography>
        {done && <DoneBy doneBy={doneBy} done={done} doneAt={doneAt} />}
        {assigned && !done && <Assignee assigned={assigned} />}
      </Box>
    </Box>
  );
};
