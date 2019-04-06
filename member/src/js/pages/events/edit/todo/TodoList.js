import React from 'react';
import Todo from './Todo';

const todos = [
  {
    id: '1',
    text: 'todo1',
    date: 'date1',
  },
  {
    id: '1',
    text: 'todo2',
    date: 'date2',
  },
  {
    id: '3',
    text: 'todo3',
    date: 'date3',
  },
];

class TodoList extends React.Component {
  render() {
    return (
      <div>
        {todos.map((todo) => {
          return <Todo key={todo.id} todo={todo} />;
        })}
      </div>
    );
  }
}

export default TodoList;
