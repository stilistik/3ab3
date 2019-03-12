import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const UnauthRoute = ({ component: C, props: cProps, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        if (!cProps.app.isAuthenticated) {
          return <C {...cProps} />;
        } else {
          return <Redirect to="/profile" />;
        }
      }}
    />
  );
};

export default UnauthRoute;
