import React from 'react';
import { connect } from 'react-redux';
import { login, showMessage } from 'Redux/actions';
import { Typography, Button } from '@material-ui/core';
import { Form, TextField } from 'Components';
import { withStyles } from '@material-ui/core/styles';
import { requestToken } from 'Auth/requestToken';

import styles from './LoginForm.css';

const mapDispatchToProps = (dispatch) => {
  return {
    login: (access_token) => {
      dispatch(login(access_token));
    },
    messageHandler: (message) => {
      dispatch(showMessage(message));
    },
  };
};

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  onSubmit = async (values) => {
    const response = await requestToken(
      values.email,
      values.password,
      this.props.messageHandler
    );
    if (response) {
      this.props.login(response.access_token);
    }
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
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
        <Form className={styles.form} onSubmit={this.onSubmit}>
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
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

const StyledLoginForm = withStyles(styles)(LoginForm);

export default connect(
  null,
  mapDispatchToProps
)(StyledLoginForm);
