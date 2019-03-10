import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const UnauthRoute = ({ component: C, props: cProps, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!cProps.app.isAuthenticated) {
          return <C {...cProps} />;
        } else {
          return <Redirect to={{ ...props.location, pathname: 'dashboard' }} />;
        }
      }}
    />
  );
};

export default UnauthRoute;
