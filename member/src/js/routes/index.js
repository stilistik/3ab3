import React from 'react';
import { Switch } from 'react-router-dom';

import AuthRoute from './AuthRoute';
import UnauthRoute from './UnauthRoute';

import Login from 'Pages/login';
import Home from 'Pages/home';
import History from 'Pages/history';
import Dashboard from 'Pages/dashboard';

const Routes = ({ props }) => {
  return (
    <Switch>
      <UnauthRoute path="/login" component={Login} props={props} />
      <AuthRoute path="/history" component={History} props={props} />
      <AuthRoute path="/dashboard" component={Dashboard} props={props} />
      <AuthRoute path="/home" component={Home} props={props} />
      <AuthRoute path="/" component={Home} props={props} />
    </Switch>
  );
};

export default Routes;
