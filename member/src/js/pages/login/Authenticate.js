import React from 'react';
import { Loading, Box } from 'Components';
import { requestToken } from 'Auth/requestToken';
import { getQueryParams } from 'History';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions';
import { requestRoute } from '../../history';

import styles from './LoginPage.less';

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
      .catch((error) => setError(true));
  }, []);

  return (
    <div className={styles.container}>
      <Box.Center>
        {error ? (
          <span>
            Something went wrong during the authentication. Try requesting
            another link.
          </span>
        ) : (
          <Loading />
        )}
      </Box.Center>
    </div>
  );
};
