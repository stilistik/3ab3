import React from 'react';
import { connect } from 'react-redux';
import { login } from 'Redux/actions';
import { TextField, Typography, Button, Grid } from '@material-ui/core';
import { requestToken } from 'Auth/requestToken';

import './LoginForm.css';

const mapDispatchToProps = (dispatch) => {
  return {
    login: (access_token) => {
      dispatch(login(access_token));
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

  submit = async (e) => {
    e.preventDefault();
    const response = await requestToken(
      this.state.email,
      this.state.password,
      this.messageHandler
    );
    this.props.login(response.access_token);
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <div styleName="login">
        <Grid container spacing={24} justify="center">
          <Grid item xs={9} sm={6} md={4} lg={3} xl={2}>
            <div styleName="header">
              <Typography variant="h2" color="inherit">
                Login
              </Typography>
            </div>
            <br />
            <form styleName="form" onSubmit={this.submit}>
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
                color="secondary"
                size="large"
              >
                Login
              </Button>
            </form>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(LoginForm);
