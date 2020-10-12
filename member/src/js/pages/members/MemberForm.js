import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { TextField, Form, UserRoleField } from 'Components';

import styles from './MemberForm.css';

const MemberForm = ({ initValues, ...rest }) => {
  const onSubmit = (values) => {
    rest.onSubmit(values);
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={6}>
        <Form
          className={styles.form}
          onSubmit={onSubmit}
          initValues={initValues}
        >
          <TextField
            id="name"
            label="Name"
            required={true}
            className={styles.field}
          />
          <TextField
            id="email"
            label="Email"
            type="email"
            required={true}
            className={styles.field}
          />
          <UserRoleField id="role" label="Role" required={true} />
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
};

export default MemberForm;
