import React from 'react';
import { Switch } from 'react-router-dom';

import AuthRoute from './AuthRoute';
import UnauthRoute from './UnauthRoute';

import Login from 'Pages/login';
import Profile from 'Pages/profile';

const Routes = ({ props }) => {
  return (
    <Switch>
      <UnauthRoute path="/login" component={Login} props={props} />
      <AuthRoute path="/profile" component={Profile} props={props} />
      <AuthRoute path="/" component={Profile} props={props} />
    </Switch>
  );
};

export default Routes;
