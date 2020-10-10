import React from 'react';
import { Loading, Box, Grid, AnimatedError } from 'Components';
import { requestToken } from 'Auth/requestToken';
import { getQueryParams } from 'History';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions';
import { requestRoute, updateParams } from '../../history';

export const Authenticate = () => {
  const [error, setError] = React.useState(false);
  const dispatch = useDispatch();
  const { token: emailToken } = getQueryParams();

  React.useEffect(() => {
    requestToken(emailToken)
      .then(({ access_token }) => {
        dispatch(login(access_token));
        requestRoute('/home');
      })
      .catch(() => setError(true));
    return () => {
      updateParams({ token: undefined });
    };
  }, []);

  return (
    <Box pt="10vh">
      <Grid container justify="center">
        <Grid item xs={9} sm={6} md={4} lg={3} xl={2}>
          {error ? (
            <Box color="#f2f2f2" fontSize={16}>
              <AnimatedError />
              <span>
                Something went wrong during the authentication. Try requesting
                another link.
              </span>
            </Box>
          ) : (
            <Loading />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};
