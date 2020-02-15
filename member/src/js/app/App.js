import React from 'react';
import { Router } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { connect } from 'react-redux';
import { login } from 'Redux/actions';
import { AuthAppCore, UnauthAppCore } from './AppCore';
import Auth from './Auth';
import Routes from 'Routes';
import { Notifier, EmojiProvider, GiphyProvider, Box } from 'Components';
import history from 'History';
import Apollo from 'Apollo';

const UnauthenticatedApp = () => {
  return (
    <Box.Flex column w="100vw" h="100vh" o="hidden">
      <CssBaseline />
      <UnauthAppCore />
      <Box.Item w="100%" o="hidden">
        <Router history={history}>
          <Routes props={{ app: { isAuthenticated: false } }} />
        </Router>
      </Box.Item>
      <Notifier />
    </Box.Flex>
  );
};

const AuthenticatedApp = () => {
  return (
    <Box.Flex column w="100vw" h="100vh" o="hidden">
      <EmojiProvider>
        <GiphyProvider>
          <Apollo>
            <CssBaseline />
            <AuthAppCore />
            <Auth>
              <Box.Item w="100%" o="hidden">
                <Router history={history}>
                  <Routes props={{ app: { isAuthenticated: true } }} />
                </Router>
              </Box.Item>
            </Auth>
            <Notifier />
          </Apollo>
        </GiphyProvider>
      </EmojiProvider>
    </Box.Flex>
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
