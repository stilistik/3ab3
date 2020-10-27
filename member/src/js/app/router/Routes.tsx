import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import history from 'App/router/History';

import { LoginForm, LoginEmailSent, Authenticating } from 'Pages/login';
import { Home } from 'Pages/home';
import { Dashboard } from 'Pages/dashboard';
import { Checklist } from 'Pages/checklist';
import { Messenger } from 'Pages/messenger';
import { Account } from 'Pages/account';
import { Profile } from 'Pages/profile';
import { AllEvents, SingleEvent } from 'Pages/events';
import { ProductList } from 'Pages/products';
import { MemberList } from 'Pages/members';
import { Documents } from 'Pages/documents';

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

      {/* Nothing matched, redirect to login */}
      <Redirect
        from="/"
        to={{
          pathname: '/login',
          state: {
            referrer: history.location.pathname,
            search: history.location.search,
          },
        }}
      />
    </Switch>
  );
};

export const AuthenticatedRoutes: React.FC = () => {
  return (
    <Switch>
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
        <AllEvents />
      </Route>
      <Route path="/event">
        <SingleEvent />
      </Route>
      <Route path="/messenger">
        <Messenger />
      </Route>
      <Route path="/documents">
        <Documents />
      </Route>

      {/* Nothing matched, redirect to home */}
      <Redirect
        from="/"
        to={{ pathname: '/home', state: history.location.state }}
      />
    </Switch>
  );
};
