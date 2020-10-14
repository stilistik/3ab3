import React from 'react';
import { Loading, Box, AnimatedError } from 'Components/index';
import { requestToken } from 'Auth/requestToken';
import { getQueryParams } from 'App/router/History';
import { setIsAuthenticated, useStore } from 'App/store';
import { requestRoute, updateParams } from '../../app/router/History';
import { Button } from '@material-ui/core';
import { LoginPageLayout } from './LoginPageLayout';

export const Authenticating: React.FC = () => {
  const [error, setError] = React.useState(false);
  const { dispatch } = useStore();
  const { token: emailToken } = getQueryParams();

  React.useEffect(() => {
    requestToken(emailToken as string)
      .then(({ access_token }: { access_token: string }) => {
        if (!access_token) setError(true);
        window.localStorage.setItem('access_token', access_token);
        dispatch(setIsAuthenticated(true));
        requestRoute('/home');
      })
      .catch(() => setError(true));
    return () => {
      updateParams({ token: undefined });
    };
  }, []);

  return (
    <LoginPageLayout>
      {error ? (
        <Box color="#f2f2f2" fontSize="16px">
          <AnimatedError />
          <span>
            Something went wrong during the authentication. Try requesting
            another link.
          </span>
          <Box.Row jc="center" mt={2}>
            <Button
              style={{ color: '#f2f2f2' }}
              onClick={() => requestRoute('/login')}
            >
              Go Back
            </Button>
          </Box.Row>
        </Box>
      ) : (
        <Loading />
      )}
    </LoginPageLayout>
  );
};
