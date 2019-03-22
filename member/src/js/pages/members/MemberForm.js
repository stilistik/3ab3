import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { Field, Form } from 'Components';

import styles from './MemberForm.css';

class MemberForm extends React.Component {
  onSubmit = (values) => {
    this.props.onSubmit(values);
  };

  render() {
    return (
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Form
            className={styles.form}
            onSubmit={this.onSubmit}
            initValues={this.props.initValues}
          >
            <Field
              id="name"
              name="Name"
              required={true}
              className={styles.field}
            />
            <Field
              id="email"
              name="Email"
              type="email"
              required={true}
              className={styles.field}
            />
            <Field
              id="password"
              name="Password"
              type="password"
              required={true}
              className={styles.field}
            />
            <br />
            <Button
              type="submit"
              variant="contained"
              size="large"
              color="primary"
            >
              Submit
            </Button>
          </Form>
        </Grid>
      </Grid>
    );
  }
}

export default MemberForm;
