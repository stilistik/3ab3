import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import AuthRoute from './AuthRoute';
import UnauthRoute from './UnauthRoute';

import { LoginForm, LoginEmailSent, Authenticating } from 'Pages/login';
import Home from 'Pages/home';
import { Dashboard } from 'Pages/dashboard';
import { Checklist } from 'Pages/checklist';
import { Messenger } from 'Pages/messenger';
import { Account } from 'Pages/account';
import Profile from 'Pages/profile';
import { Events, EditEvent } from 'Pages/events';
import { ProductList } from 'Pages/products';
import { MemberList } from 'Pages/members';

const Routes = ({ props }) => {
  return (
    <Switch>
      <AuthRoute path="/events/edit" component={EditEvent} props={props} />
      <UnauthRoute path="/login" component={LoginForm} props={props} />
      <UnauthRoute path="/loginsent" component={LoginEmailSent} props={props} />
      <UnauthRoute path="/auth" component={Authenticating} props={props} />
      <AuthRoute path="/home" component={Home} props={props} />
      <AuthRoute path="/dashboard" component={Dashboard} props={props} />
      <AuthRoute path="/checklist" component={Checklist} props={props} />
      <AuthRoute path="/account" component={Account} props={props} />
      <AuthRoute path="/profile" component={Profile} props={props} />
      <AuthRoute path="/products" component={ProductList} props={props} />
      <AuthRoute path="/members" component={MemberList} props={props} />
      <AuthRoute path="/events" component={Events} props={props} />
      <AuthRoute path="/messenger" component={Messenger} props={props} />

      <Redirect to="/home" />
    </Switch>
  );
};

export default Routes;
