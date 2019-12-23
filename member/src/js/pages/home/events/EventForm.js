import React from 'react';
import { Button } from '@material-ui/core';
import { ImageField, TextField, DateField, Form } from 'Components';

import styles from './EventForm.less';

const EventForm = ({ initValues, ...rest }) => {
  const onSubmit = (values) => {
    rest.onSubmit(values);
  };

  return (
    <Form className={styles.form} onSubmit={onSubmit} initValues={initValues}>
      <ImageField
        className={styles.imagefield}
        id="image"
        type="image"
        required={true}
        label="Event Image"
      />
      <TextField
        id="title"
        label="Title"
        required={true}
        className={styles.field}
      />
      <TextField
        id="description"
        label="Description"
        required={true}
        className={styles.field}
      />
      <DateField
        id="date"
        label="Date"
        type="date"
        required={true}
        className={styles.field}
      />
      <br />
      <Button type="submit" variant="contained" size="large" color="primary">
        Submit
      </Button>
    </Form>
  );
};

export default EventForm;
