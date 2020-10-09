import React from 'react';
import { connect } from 'react-redux';
import { login } from 'Redux/actions';
import { Typography, Fab } from '@material-ui/core';
import { Form, TextField, Loading, Message } from 'Components';
import { requestEmail } from 'Auth/requestEmail';

import styles from './LoginForm.less';

const EmailForm = ({ setEmailSent }) => {
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const success = await requestEmail(values.email);
      if (success) {
        setEmailSent(true);
      }
    } catch (error) {
      Message.error(error.message);
    }
  };

  return (
    <Form className={styles.form} onSubmit={onSubmit}>
      <TextField
        id="email"
        label="Email"
        type="email"
        required={true}
        className={styles.field}
        InputProps={{ className: styles.input }}
        InputLabelProps={{ className: styles.label }}
      />
      <Fab
        size="large"
        type="submit"
        variant="contained"
        color="primary"
        style={{ marginTop: 20 }}
      >
        Request Login Link
      </Fab>
      {loading && <Loading color="#bbb" style={{ marginTop: 20 }} />}
    </Form>
  );
};

const Notification = () => {
  return <div>email has been sent to you</div>;
};

export const LoginForm = () => {
  const [emailSent, setEmailSent] = React.useState(false);

  return (
    <div>
      <div className={styles.header}>
        <Typography
          classes={{ root: styles.title }}
          variant="h3"
          color="inherit"
        >
          Login
        </Typography>
      </div>
      <br />
      {emailSent ? <Notification /> : <EmailForm setEmailSent={setEmailSent} />}
    </div>
  );
};
