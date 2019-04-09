import React from 'react';
import { DefaultGrid, TextField } from 'Components';
import { Paper, Grid, Typography, Divider, Button } from '@material-ui/core';
import TemplateSelector from './TemplateSelector';

import styles from './CreateQuestionForm.css';

class CreateQuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      templates: [],
      text: '',
      description: '',
    };
  }

  onChange = (id, value) => {
    this.setState({
      [id]: value,
    });
  };

  onSelectionChange = (values) => {
    this.setState({
      templates: values,
    });
  };

  onSubmit = () => {
    const values = {
      text: this.state.text,
      description: this.state.description,
      templateIds: this.state.templates,
    };
    this.props.onSubmit(values);
  };

  render() {
    return (
      <DefaultGrid>
        <div className={styles.container}>
          <Paper className={styles.paper}>
            <Grid container spacing={24}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Formulate Question:</Typography>
                <Divider />
                <br />
                <TextField
                  id="text"
                  name="Question"
                  type="text"
                  onChange={this.onChange}
                  value={this.state.text}
                  className={styles.field}
                />
                <TextField
                  id="description"
                  name="Description"
                  type="text"
                  onChange={this.onChange}
                  value={this.state.description}
                  className={styles.field}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Select Todos:</Typography>
                <Divider />
                <br />
                <TemplateSelector onChange={this.onSelectionChange} />
              </Grid>
              <Grid item xs={12}>
                <div className={styles.btnwrap}>
                  <Button
                    className={styles.btn}
                    variant="contained"
                    color="primary"
                    onClick={this.onSubmit}
                  >
                    Submit
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </DefaultGrid>
    );
  }
}

export default CreateQuestionForm;
