import React from 'react';
import { connect } from 'react-redux';
import { login } from 'Redux/actions';
import { Typography, Button, Link, Box } from '@material-ui/core';
import { Form, TextField, Loading, Message } from 'Components';
import { requestToken } from 'Auth/requestToken';

import styles from './LoginForm.less';

const mapDispatchToProps = (dispatch) => {
  return {
    login: (access_token) => {
      dispatch(login(access_token));
    },
  };
};

const LoginForm = (props) => {
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const response = await requestToken(values.email, values.password);
      if (response) {
        props.login(response.access_token);
      } else {
        setLoading(false);
      }
    } catch (error) {
      Message.error(error);
      setLoading(false);
    }
  };

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
        <TextField
          id="password"
          label="Password"
          type="password"
          required={true}
          className={styles.field}
          InputProps={{ className: styles.input }}
          InputLabelProps={{ className: styles.label }}
        />
        <br />
        <Link className={styles.link} href="/request_reset">
          Forgot Password?
        </Link>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
        {loading && <Loading color="#bbb" style={{ marginTop: 20 }} />}
      </Form>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(LoginForm);
