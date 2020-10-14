import React from 'react';
import { Router } from 'react-router-dom';
import { AuthenticatedScaffold, UnauthenticatedScaffold } from './core/Scaffold';
import { AuthenticatedRoutes, UnauthenticatedRoutes } from './router';
import {
  Notifier,
  EmojiProvider,
  GiphyProvider,
  Box,
  UserProvider,
} from 'Components/index';
import history from 'App/router/History';
import Apollo from './network';
import { UnauthBackground } from './core/UnauthBackground';

const UnauthenticatedApp: React.FC = () => {
  return (
    <Box.Flex column w="100vw" h="100vh" o="hidden">
      <UnauthenticatedScaffold />
      <Box.Item w="100%" o="hidden">
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
  return (
    <Box.Flex column w="100vw" h="100vh" o="hidden">
      <EmojiProvider>
        <GiphyProvider>
          <Apollo>
            <UserProvider>
              <AuthenticatedScaffold />
              <Box.Item w="100%" o="hidden">
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
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    const access_token = window.localStorage.getItem('access_token');
    if (access_token) setIsAuthenticated(true);
  }, []);

  if (isAuthenticated) return <AuthenticatedApp />;
  else return <UnauthenticatedApp />;
};
