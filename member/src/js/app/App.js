import React from 'react';
import { Router } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { connect } from 'react-redux';
import { login } from 'Redux/actions';
import AppCore from './AppCore';
import Auth from './Auth';
import Routes from 'Routes';
import { Notifier, EmojiProvider } from 'Components';
import history from 'History';
import Apollo from 'Apollo';

import styles from './App.css';

const UnauthenticatedApp = () => {
  return (
    <div className={styles.container}>
      <CssBaseline />
      <Router history={history}>
        <Routes props={{ app: { isAuthenticated: false } }} />
      </Router>
      <Notifier />
    </div>
  );
};

const AuthenticatedApp = () => {
  return (
    <div className={styles.container}>
      <EmojiProvider>
        <Apollo>
          <CssBaseline />
          <AppCore />
          <Auth>
            <Router history={history}>
              <Routes props={{ app: { isAuthenticated: true } }} />
            </Router>
          </Auth>
          <Notifier />
        </Apollo>
      </EmojiProvider>
    </div>
  );
};

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

const App = ({ login, isAuthenticated }) => {
  React.useEffect(() => {
    const access_token = window.localStorage.getItem('access_token');
    if (access_token) login(access_token);
  }, []);

  if (isAuthenticated) return <AuthenticatedApp />;
  else return <UnauthenticatedApp />;
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
