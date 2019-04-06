import React from 'react';
import { Typography } from '@material-ui/core';

import styles from './Todo.less';

const TodoIndicator = ({ index }) => {
  return (
    <div className={styles.index}>
      <span>{index}</span>
    </div>
  );
};

const DateDisplay = ({ date }) => {
  console.log(date);
  
  const date_str = new Date(date).toDateString();
  return <Typography variant="h6">{date_str}</Typography>;
};

class Todo extends React.Component {
  render() {
    const { index, text, due } = this.props.todo;
    return (
      <div>
        <div className={styles.header}>
          <TodoIndicator index={index} />
          <DateDisplay date={due} />
        </div>
        <div className={styles.todo}>
          <p>{text}</p>
        </div>
      </div>
    );
  }
}

export default Todo;
