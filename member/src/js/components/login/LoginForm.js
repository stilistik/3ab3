import React from 'react';
import { connect } from 'react-redux';
import { login } from 'Redux/actions';
import { TextField, Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { requestToken } from 'Auth/requestToken';

import './LoginForm.css';

const styles = {
  input: {
    color: '#f2f2f2',
  },
  label: {
    color: '#f2f2f2 !important',
  },
  header: {
    color: '#f2f2f2',
  },
};

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
    const { classes } = this.props;
    return (
      <div>
        <div styleName="header">
          <Typography
            classes={{ root: classes.header }}
            variant="h2"
            color="inherit"
          >
            Login
          </Typography>
        </div>
        <br />
        <form styleName="form" onSubmit={this.submit}>
          <TextField
            classes={{ underline: classes.underline }}
            InputProps={{
              className: classes.input,
            }}
            InputLabelProps={{
              className: classes.label,
            }}
            name="email"
            label="Email"
            margin="normal"
            onChange={this.onChange}
          />
          <TextField
            classes={{ underline: classes.underline }}
            InputProps={{
              className: classes.input,
            }}
            InputLabelProps={{
              className: classes.label,
            }}
            name="password"
            label="Password"
            type="password"
            margin="normal"
            onChange={this.onChange}
          />
          <br />
          <Button
            variant="contained"
            type="submit"
            color="secondary"
            size="large"
            styleName="button"
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}

const StyledLoginForm = withStyles(styles)(LoginForm);

export default connect(
  null,
  mapDispatchToProps
)(StyledLoginForm);
