import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { LoginForm, LoginEmailSent, Authenticating } from 'Pages/login';
import { Home } from 'Pages/home';
import { Dashboard } from 'Pages/dashboard';
import { Checklist } from 'Pages/checklist';
import { Messenger } from 'Pages/messenger';
import { Account } from 'Pages/account';
import Profile from 'Pages/profile';
import { Events, EditEvent } from 'Pages/events';
import { ProductList } from 'Pages/products';
import { MemberList } from 'Pages/members';

export const UnauthenticatedRoutes: React.FC = () => {
  return (
    <Switch>
      <Route path="/login">
        <LoginForm />
      </Route>
      <Route path="/loginsent">
        <LoginEmailSent />
      </Route>
      <Route path="/auth">
        <Authenticating />
      </Route>
      <Redirect to="/login" />
    </Switch>
  );
};

export const AuthenticatedRoutes: React.FC = () => {
  return (
    <Switch>
      <Route path="/events/edit">
        <EditEvent />
      </Route>
      <Route path="/home">
        <Home />
      </Route>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
      <Route path="/checklist">
        <Checklist />
      </Route>
      <Route path="/account">
        <Account />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/products">
        <ProductList />
      </Route>
      <Route path="/members">
        <MemberList />
      </Route>
      <Route path="/events">
        <Events />
      </Route>
      <Route path="/messenger">
        <Messenger />
      </Route>
      <Redirect to="/home" />
    </Switch>
  );
};
