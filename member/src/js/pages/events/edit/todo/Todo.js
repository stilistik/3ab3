import React from 'react';
import { Mutation } from 'react-apollo';
import { Typography } from '@material-ui/core';
import gql from 'graphql-tag';
import { Icon, UserAvatar } from 'Components';

import styles from './Todo.less';

const TodoIndicator = ({ index, done, onClick }) => {
  let cls = styles.index;
  if (done) cls += ' ' + styles.done;
  return (
    <div className={cls} onClick={onClick}>
      {done ? <Icon type="done" /> : <span>{index}</span>}
    </div>
  );
};

const DateDisplay = ({ date }) => {
  const str = new Date(date).toString();
  const month = str.split(' ')[1].toUpperCase();
  const day = str.split(' ')[2];
  return (
    <div className={styles.date}>
      <Typography variant="h6" className={styles.month}>
        {month}
      </Typography>
      <Typography gutterBottom variant="h6" className={styles.day}>
        | {day}
      </Typography>
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

class Todo extends React.Component {
  render() {
    const { index, text, due, done, doneBy, doneAt } = this.props.todo;
    const { onClick } = this.props;
    return (
      <div>
        <div className={styles.header}>
          <TodoIndicator index={index} done={done} onClick={onClick} />
          {done ? (
            <DoneBy doneBy={doneBy} done={done} doneAt={doneAt} />
          ) : (
            <DateDisplay date={due} />
          )}
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
