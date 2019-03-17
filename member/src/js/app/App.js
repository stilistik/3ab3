import React from 'react';
import { Router } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { connect } from 'react-redux';
import { login } from 'Redux/actions';
import AppHeader from './AppHeader';
import AppMenu from './AppMenu';
import Routes from 'Routes';
import MessageHandler from './MessageHandler';
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
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
    };
  }

  componentDidMount = () => {
    const access_token = window.localStorage.getItem('access_token');
    if (access_token) this.props.login(access_token);
  };

  setDrawerOpen = (value) => {
    this.setState({ drawerOpen: value });
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
        {this.props.isAuthenticated ? (
          <div>
            <AppHeader setDrawerOpen={this.setDrawerOpen} />
            <AppMenu
              drawerOpen={this.state.drawerOpen}
              setDrawerOpen={this.setDrawerOpen}
            />
          </div>
        ) : null}
        <Router history={history}>
          <Routes props={props} />
        </Router>
        <MessageHandler />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
