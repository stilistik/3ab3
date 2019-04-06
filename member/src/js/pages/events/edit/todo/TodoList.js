import React from 'react';
import Todo from './Todo';
import { Paper } from '@material-ui/core';

class TodoList extends React.Component {
  render() {
    return (
      <Paper style={{ padding: '20px' }}>
        {this.props.todos.map((todo, i) => {
          const index = i + 1;
          return <Todo key={todo.id} todo={{ index, ...todo }} />;
        })}
      </Paper>
    );
  }
}

export default TodoList;
