import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const UnauthRoute = ({ component: C, props: cProps, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        const { prevLocation } = rest.location.state;
        if (!cProps.app.isAuthenticated) {
          return <C {...cProps} />;
        } else if (prevLocation) {
          return <Redirect to={prevLocation} />;
        } else {
          return <Redirect to="/profile" />;
        }
      }}
    />
  );
};

export default UnauthRoute;
