import React from 'react';
import { Mutation } from 'react-apollo';
import { Typography, IconButton } from '@material-ui/core';
import gql from 'graphql-tag';
import { Icon, UserAvatar } from 'Components';
import Assign from './Assign';

import styles from './Todo.less';

const TodoIndicator = ({ done, onClick, date }) => {
  let cls = styles.circle;
  if (done) cls += ' ' + styles.done;
  return (
    <div className={cls} onClick={onClick}>
      {done ? <Icon type="done" /> : <DateDisplay date={date} />}
    </div>
  );
};

const DateDisplay = ({ date }) => {
  const str = new Date(date).toString();
  const month = str.split(' ')[1].toUpperCase();
  const day = str.split(' ')[2];
  return (
    <div className={styles.date}>
      <div className={styles.month}>
        <span>{month}</span>
      </div>
      <div className={styles.day}>
        <span>{day}</span>
      </div>
    </div>
  );
};

const DoneBy = ({ done, doneBy, doneAt }) => {
  if (!done) return null;
  return (
    <div>
      <div className={styles.doneby}>
        <UserAvatar
          user={doneBy}
          style={{ width: '25px', height: '25px', marginRight: '10px' }}
        />
        <Typography variant="body1" className={styles.typo}>
          {doneBy.name}
        </Typography>
      </div>
      <Typography variant="body2" style={{ color: '#666' }}>
        {new Date(doneAt).toDateString()}
      </Typography>
    </div>
  );
};

const MUTATION = gql`
  mutation($todoId: ID!) {
    deleteTodo(todoId: $todoId) {
      id
    }
  }
`;

class DeleteTodo extends React.Component {
  onClick = () => {
    this.deleteTodo({
      variables: { todoId: this.props.todoId },
      refetchQueries: () => this.props.refetch,
    });
  };

  render() {
    return (
      <Mutation mutation={MUTATION}>
        {(deleteTodo) => {
          this.deleteTodo = deleteTodo;
          return (
            <IconButton onClick={this.onClick}>
              <Icon type="delete" />
            </IconButton>
          );
        }}
      </Mutation>
    );
  }
}

class Todo extends React.Component {
  render() {
    const { id, text, due, done, doneBy, doneAt, assigned } = this.props.todo;
    const { onClick, refetch } = this.props;
    return (
      <div style={{ marginBottom: '10px' }}>
        <div className={styles.header}>
          <TodoIndicator done={done} onClick={onClick} date={due} />
          {done ? (
            <DoneBy doneBy={doneBy} done={done} doneAt={doneAt} />
          ) : (
            <Assign todoId={id} assigned={assigned} refetch={refetch} />
          )}
          <DeleteTodo todoId={id} refetch={refetch} />
        </div>
        <div className={styles.todo}>
          <p>{text}</p>
        </div>
      </div>
    );
  }
}

const CHECK_TODO = gql`
  mutation($todoId: ID!) {
    checkTodo(todoId: $todoId) {
      id
    }
  }
`;

const UNCHECK_TODO = gql`
  mutation($todoId: ID!) {
    uncheckTodo(todoId: $todoId) {
      id
    }
  }
`;

class TodoMutation extends React.Component {
  onClick = () => {
    this.mutate({
      variables: { todoId: this.props.todo.id },
      refetchQueries: () => this.props.refetch,
    });
  };

  render() {
    const { done } = this.props.todo;
    const mutation = done ? UNCHECK_TODO : CHECK_TODO;
    return (
      <Mutation mutation={mutation}>
        {(mutate) => {
          this.mutate = mutate;
          return <Todo {...this.props} onClick={this.onClick} />;
        }}
      </Mutation>
    );
  }
}

export default TodoMutation;
