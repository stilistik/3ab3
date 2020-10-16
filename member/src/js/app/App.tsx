import React from 'react';
import { Router } from 'react-router-dom';
import {
  AuthenticatedScaffold,
  UnauthenticatedScaffold,
} from './core/Scaffold';
import { AuthenticatedRoutes, UnauthenticatedRoutes } from './router';
import {
  Notifier,
  EmojiProvider,
  GiphyProvider,
  Box,
  UserProvider,
} from 'Components/index';
import history, { requestRoute } from 'App/router/History';
import Apollo from './network';
import { UnauthBackground } from './core/UnauthBackground';
import { useStore } from 'App/store';

const UnauthenticatedApp: React.FC = () => {
  return (
    <Box.Flex column w="100vw" h="100vh" o="hidden">
      <UnauthenticatedScaffold />
      <Box.Item fg={1} w="100%" o="hidden">
        <UnauthBackground>
          <Router history={history}>
            <UnauthenticatedRoutes />
          </Router>
        </UnauthBackground>
      </Box.Item>
      <Notifier />
    </Box.Flex>
  );
};

const AuthenticatedApp = () => {
  // restore location in state after successful login
  React.useEffect(() => {
    try {
      const { state } = history.location as any;
      if (state) requestRoute(state.referrer, { search: state.search });
    } catch (error) {
      requestRoute('/home');
    }
  }, []);

  return (
    <Box.Flex column w="100vw" h="100vh" o="hidden">
      <EmojiProvider>
        <GiphyProvider>
          <Apollo>
            <UserProvider>
              <AuthenticatedScaffold />
              <Box.Item fg={1} w="100%" o="hidden">
                <Router history={history}>
                  <AuthenticatedRoutes />
                </Router>
              </Box.Item>
              <Notifier />
            </UserProvider>
          </Apollo>
        </GiphyProvider>
      </EmojiProvider>
    </Box.Flex>
  );
};

export const App: React.FC = () => {
  const { state } = useStore();
  const { isAuthenticated } = state;
  if (isAuthenticated) return <AuthenticatedApp />;
  else return <UnauthenticatedApp />;
};
