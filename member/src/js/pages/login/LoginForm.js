import React from 'react';
import { connect } from 'react-redux';
import { login } from 'Redux/actions';
import { TextField, Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { requestToken } from 'Auth/requestToken';
import { requestRoute } from 'History';

import styles from './LoginForm.css';

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
    requestRoute('/profile');
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  messageHandler = () => {};

  render() {
    return (
      <div>
        <div className={styles.header}>
          <Typography
            classes={{ root: styles.title }}
            variant="h2"
            color="inherit"
          >
            Login
          </Typography>
        </div>
        <br />
        <form className={styles.form} onSubmit={this.submit}>
          <TextField
            InputProps={{ className: styles.input }}
            InputLabelProps={{ className: styles.label }}
            name="email"
            label="Email"
            margin="normal"
            onChange={this.onChange}
          />
          <TextField
            InputProps={{ className: styles.input }}
            InputLabelProps={{ className: styles.label }}
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
