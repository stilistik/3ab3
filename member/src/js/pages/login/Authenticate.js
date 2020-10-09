import React from 'react';
import { Loading } from 'Components';
import { requestToken } from 'Auth/requestToken';
import { getQueryParams } from 'History';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions';
import { requestRoute } from '../../history';

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

  if (error) return <h1>error</h1>;
  return <Loading />;
};
