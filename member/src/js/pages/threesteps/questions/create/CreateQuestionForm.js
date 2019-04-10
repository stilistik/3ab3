import React from 'react';
import { DefaultGrid, TextField, ChipArea, Form } from 'Components';
import { Paper, Grid, Button } from '@material-ui/core';

import styles from './CreateQuestionForm.css';

class CreateQuestionForm extends React.Component {
  onSubmit = (values) => {
    this.props.onSubmit(values);
  };

  createOptions = (templates) => {
    return templates.map((template) => {
      return {
        id: template.id,
        avatar: template.offsetDays,
        text: template.text,
      };
    });
  };

  render() {
    const options = this.createOptions(this.props.templates);
    return (
      <DefaultGrid>
        <div className={styles.container}>
          <Paper className={styles.paper}>
            <Grid item xs={12}>
              <Form onSubmit={this.onSubmit}>
                <TextField
                  id="text"
                  name="Question"
                  type="text"
                  required={true}
                  className={styles.field}
                />
                <TextField
                  id="description"
                  name="Description"
                  type="text"
                  required={true}
                  className={styles.field}
                />
                <ChipArea
                  id="templateIds"
                  name="Todos"
                  type="select"
                  required={true}
                  className={styles.field}
                  options={options}
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
            </Grid>
          </Paper>
        </div>
      </DefaultGrid>
    );
  }
}

export default CreateQuestionForm;
