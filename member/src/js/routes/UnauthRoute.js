import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const UnauthRoute = ({ component: C, props: cProps, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        let prevLocation = null;
        if (rest.location.state)
          prevLocation = rest.location.state.prevLocation;
        if (!cProps.app.isAuthenticated) {
          return <C {...cProps} />;
        } else if (prevLocation) {
          return <Redirect to={prevLocation} />;
        } else {
          return <Redirect to="/home" />;
        }
      }}
    />
  );
};

export default UnauthRoute;
