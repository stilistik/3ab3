import React from 'react';
import { Typography, Fab } from '@material-ui/core';
import {
  Form,
  TextField,
  Loading,
  Message,
  Icon,
  Box,
  AnimatedCheckmark,
} from 'Components';
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
        color="primary"
        variant="extended"
        style={{ marginTop: 20 }}
      >
        <Icon type="mail" />
        <Box ml={1}>Request Login Link</Box>
      </Fab>
      {loading && <Loading color="#bbb" style={{ marginTop: 20 }} />}
    </Form>
  );
};

const Notification = () => {
  return (
    <Box.Center>
      <div>
        <AnimatedCheckmark />
        <Box color="#f2f2f2" fs={16}>
          <p>If your email is valid, you will receive a login link shortly.</p>
          <p>Check your inbox!</p>
        </Box>
      </div>
    </Box.Center>
  );
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
