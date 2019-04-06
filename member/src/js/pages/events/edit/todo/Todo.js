import React from 'react';
import { Mutation } from 'react-apollo';
import { Typography } from '@material-ui/core';
import gql from 'graphql-tag';
import { Icon } from 'Components';

import styles from './Todo.less';

const TodoIndicator = ({ index, done, onClick }) => {
  return (
    <div className={styles.index} onClick={onClick}>
      {done ? <Icon type="done" /> : <span>{index}</span>}
    </div>
  );
};

const DateDisplay = ({ date }) => {
  const date_str = new Date(date).toDateString();
  return <Typography variant="h6">{date_str}</Typography>;
};

class Todo extends React.Component {
  render() {
    const { index, text, due, done } = this.props.todo;
    const { onClick } = this.props;
    return (
      <div>
        <div className={styles.header}>
          <TodoIndicator index={index} done={done} onClick={onClick} />
          <DateDisplay date={due} />
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
    try {
      this.mutate({
        variables: { todoId: this.props.todo.id },
        refetchQueries: () => this.props.refetch,
      });
    } catch (error) {
      console.log(error);
    }
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
