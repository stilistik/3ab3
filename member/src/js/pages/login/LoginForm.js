import React from 'react';
import { Typography, Fab, makeStyles } from '@material-ui/core';
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

const useStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  input: {
    color: '#f2f2f2',
    '&:before': { borderBottomColor: '#919191' },
    '&&:hover:before': { borderBottomColor: '#919191' },
    '&:after': { borderBottomColor: '#f2f2f2' },
  },
  label: { color: '#f2f2f2', '&.Mui-focused': { color: '#f2f2f2' } },
});

const EmailForm = ({ setEmailSent }) => {
  const [loading, setLoading] = React.useState(false);
  const styles = useStyles();

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
        classes={{
          input: { root: styles.input, underline: styles.underline },
          label: { root: styles.label },
        }}
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
      {loading && (
        <Box mt={3}>
          <Loading color="#f2f2f2" />
        </Box>
      )}
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
      <Box className={styles.header} color="#f2f2f2">
        <Typography variant="h3">Login</Typography>
      </Box>
      <br />
      {emailSent ? <Notification /> : <EmailForm setEmailSent={setEmailSent} />}
    </div>
  );
};
