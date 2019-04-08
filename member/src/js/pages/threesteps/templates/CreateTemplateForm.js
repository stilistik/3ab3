import React from 'react';
import { Form, Field, TextField } from 'Components';
import { Button, Paper, Typography } from '@material-ui/core';

import styles from './CreateTemplateForm.css';

class CreateTemplateForm extends React.Component {
  onSubmit = (values) => {
    const input = {
      text: values.text,
      offsetDays: parseInt(values.offsetDays),
    };
    this.props.onSubmit(input);
  };

  render() {
    return (
      <Paper className={styles.paper}>
        <Typography variant="h3" className={styles.typo}>
          Create Todo Template
        </Typography>
        <Form onSubmit={this.onSubmit} className={styles.form}>
          <TextField
            id="text"
            name="Todo"
            type="text"
            required={true}
            className={styles.field}
          />
          <Field
            id="offsetDays"
            name="Offset Days"
            type="number"
            required={true}
            className={styles.field}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={styles.field}
          >
            Submit
          </Button>
        </Form>
      </Paper>
    );
  }
}

export default CreateTemplateForm;
