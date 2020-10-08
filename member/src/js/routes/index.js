import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import AuthRoute from './AuthRoute';
import UnauthRoute from './UnauthRoute';

import Login from 'Pages/login';
import Home from 'Pages/home';
import { ResetPassword, RequestReset } from 'Pages/resetpassword';
import { Dashboard } from 'Pages/dashboard';
import { Checklist } from 'Pages/checklist';
import { Messenger } from 'Pages/messenger';
import Account from 'Pages/account';
import Profile from 'Pages/profile';
import { Events, EditEvent } from 'Pages/events';
import { Products, CreateProduct, EditProduct } from 'Pages/products';
import { Members, CreateMember, EditMember } from 'Pages/members';

const Routes = ({ props }) => {
  return (
    <Switch>
      <AuthRoute path="/products/edit" component={EditProduct} props={props} />
      <AuthRoute
        path="/members/create"
        component={CreateMember}
        props={props}
      />
      <AuthRoute
        path="/products/create"
        component={CreateProduct}
        props={props}
      />
      <AuthRoute path="/members/edit" component={EditMember} props={props} />
      <AuthRoute path="/events/edit" component={EditEvent} props={props} />
      <UnauthRoute path="/login" component={Login} props={props} />
      <UnauthRoute
        path="/reset_password"
        component={ResetPassword}
        props={props}
      />
      <UnauthRoute
        path="/request_reset"
        component={RequestReset}
        props={props}
      />
      <AuthRoute path="/home" component={Home} props={props} />
      <AuthRoute path="/dashboard" component={Dashboard} props={props} />
      <AuthRoute path="/checklist" component={Checklist} props={props} />
      <AuthRoute path="/account" component={Account} props={props} />
      <AuthRoute path="/profile" component={Profile} props={props} />
      <AuthRoute path="/products" component={Products} props={props} />
      <AuthRoute path="/members" component={Members} props={props} />
      <AuthRoute path="/events" component={Events} props={props} />
      <AuthRoute path="/messenger" component={Messenger} props={props} />

      <Redirect to="/home" />
    </Switch>
  );
};

export default Routes;
