import React from 'react';

import styles from './Todo.css';

class Todo extends React.Component {
  render() {
    const { index, text, date } = this.props.todo;
    return (
      <div className={styles.todo}>
        <div className={styles.index}>{index}</div>
        <div>
          <p>{date}</p>
          <p>{text}</p>
        </div>
      </div>
    );
  }
}

export default Todo;
