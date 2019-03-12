import React from 'react';
import { Router } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { connect } from 'react-redux';
import { login } from 'Redux/actions';
import AppHeader from './AppHeader';
import Routes from 'Routes';
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
        <div styleName="header">
          <AppHeader />
        </div>
        <div styleName="content">
          <Router history={history}>
            <Routes props={props} />
          </Router>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
