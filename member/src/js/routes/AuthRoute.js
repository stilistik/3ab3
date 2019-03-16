import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthRoute = ({ component: C, props: cProps, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        if (cProps.app.isAuthenticated) {
          return <C {...cProps} />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default AuthRoute;