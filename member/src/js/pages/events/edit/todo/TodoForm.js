import React from 'react';
import { Paper, Button } from '@material-ui/core';
import { Form, Field, DateField } from 'Components';

import styles from './TodoForm.css';

class TodoForm extends React.Component {
  onSubmit = (values) => {
    this.props.onSubmit(values);
  };

  render() {
    return (
      <Paper style={{ padding: '20px' }}>
        <Form onSubmit={this.onSubmit} className={styles.form}>
          <Field
            id="text"
            name="Todo"
            type="text"
            required={true}
            className={styles.field}
          />
          <DateField
            id="due"
            name="Due"
            type="date"
            required={true}
            className={styles.field}
            style={{ marginBottom: '3px' }}
          />
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Paper>
    );
  }
}

export default TodoForm;
