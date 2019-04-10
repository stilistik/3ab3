import React from 'react';
import { DefaultGrid, TextField, ChipArea, Form } from 'Components';
import { Paper, Grid, Button, Typography } from '@material-ui/core';

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
            <Form onSubmit={this.onSubmit}>
              <Grid container spacing={24}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h3">Question</Typography>
                  <br />
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
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h3">Todos</Typography>
                  <br />
                  <ChipArea
                    id="templateIds"
                    type="select"
                    required={true}
                    className={styles.field}
                    options={options}
                  />
                </Grid>
                <Grid item xs={12}>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" color="primary" type="submit">
                      Submit
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </Form>
          </Paper>
        </div>
      </DefaultGrid>
    );
  }
}

export default CreateQuestionForm;
