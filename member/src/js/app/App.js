import React from 'react';
import { Router } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { connect } from 'react-redux';
import { login } from 'Redux/actions';
import AppCore from './AppCore';
import Auth from './Auth';
import Routes from 'Routes';
import { Notifier } from 'Components';
import history from 'History';

import './App.css';

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (access_token) => {
      dispatch(login(access_token));
    },
  };
};

class App extends React.Component {
  componentDidMount = () => {
    const access_token = window.localStorage.getItem('access_token');
    if (access_token) this.props.login(access_token);
  };

  render() {
    const props = {
      app: {
        isAuthenticated: this.props.isAuthenticated,
      },
    };

    return (
      <div styleName="container">
        <CssBaseline />
        <AppCore isAuthenticated={this.props.isAuthenticated} />
        <Auth>
          <Router history={history}>
            <Routes props={props} />
          </Router>
        </Auth>
        <Notifier />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
