import React from 'react';
import { TextField, Typography, Button } from '@material-ui/core';
import { login } from 'Auth/login';

import './LoginForm.css';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  submit = async (e) => {
    e.preventDefault();
    const response = await login(
      this.state.email,
      this.state.password,
      this.messageHandler
    );
    console.log(response);
  };

  messageHandler = (...args) => {
    console.log(args);
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <div styleName="login">
        <div>
          <div styleName="title">
            <Typography variant="h2" color="inherit">
              Login
            </Typography>
          </div>
          <br />
          <form onSubmit={this.submit} styleName="form">
            <TextField
              name="email"
              label="Email"
              margin="normal"
              onChange={this.onChange}
            />
            <TextField
              name="password"
              label="Password"
              margin="normal"
              onChange={this.onChange}
            />
            <br />
            <Button
              variant="contained"
              type="submit"
              color="primary"
              size="large"
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
