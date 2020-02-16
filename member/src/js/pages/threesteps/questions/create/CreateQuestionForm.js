import React from 'react';
import {
  Grid,
  TextField,
  MultiSelectField,
  Form,
  Icon,
} from 'Components';
import { Paper, Button, Typography } from '@material-ui/core';
import { requestRoute } from 'History';

import styles from './CreateQuestionForm.css';

class CreateQuestionForm extends React.Component {
  onSubmit = (values) => {
    const { templates, ...rest } = values;
    this.props.onSubmit({
      templateIds: templates.map((el) => el.value),
      ...rest,
    });
  };

  createOptions = (templates) => {
    return templates.map((template) => {
      return {
        value: template.id,
        avatar: template.offsetDays,
        label: template.text,
      };
    });
  };

  onCreateTemplate = () => {
    requestRoute('/templates');
  };

  render() {
    const options = this.createOptions(this.props.templates);
    return (
      <Grid.Default>
        <div className={styles.container}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Paper className={styles.paper}>
                <Form onSubmit={this.onSubmit}>
                  <Typography variant="h3">Create Question</Typography>
                  <br />
                  <TextField
                    id="text"
                    label="Title"
                    type="text"
                    required={true}
                    className={styles.field}
                  />
                  <TextField
                    id="description"
                    label="Description"
                    type="text"
                    required={true}
                    className={styles.field}
                  />
                  <div className={styles.center}>
                    <MultiSelectField
                      id="templates"
                      label="Todos"
                      type="select"
                      required={true}
                      className={styles.field}
                      options={options}
                    />
                    <Button
                      className={styles.createButton}
                      color="secondary"
                      variant="outlined"
                      size="small"
                      onClick={this.onCreateTemplate}
                    >
                      <Icon type="add" />
                    </Button>
                  </div>

                  <div className={styles.center}>
                    <Button variant="contained" color="primary" type="submit">
                      Submit
                    </Button>
                  </div>
                </Form>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Grid.Default>
    );
  }
}

export default CreateQuestionForm;
