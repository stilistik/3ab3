import React from 'react';
import { Switch } from 'react-router-dom';

import AuthRoute from './AuthRoute';
import UnauthRoute from './UnauthRoute';

import Login from 'Pages/login';
import Home from 'Pages/home';
import History from 'Pages/history';
import Dashboard from 'Pages/dashboard';
import Account from 'Pages/account';
import Profile from 'Pages/profile';
import { Events, CreateEvent, EditEvent } from 'Pages/events';
import { Products, CreateProduct, EditProduct } from 'Pages/products';
import { Members, CreateMember, EditMember } from 'Pages/members';
import { Questions, CreateQuestion } from 'Pages/threesteps';

const Routes = ({ props }) => {
  return (
    <Switch>
      <UnauthRoute path="/login" component={Login} props={props} />
      <AuthRoute path="/history" component={History} props={props} />
      <AuthRoute path="/dashboard" component={Dashboard} props={props} />
      <AuthRoute path="/home" component={Home} props={props} />
      <AuthRoute path="/account" component={Account} props={props} />
      <AuthRoute path="/profile" component={Profile} props={props} />
      <AuthRoute path="/products" component={Products} props={props} />
      <AuthRoute
        path="/createproduct"
        component={CreateProduct}
        props={props}
      />
      <AuthRoute path="/editproduct" component={EditProduct} props={props} />
      <AuthRoute path="/members" component={Members} props={props} />
      <AuthRoute path="/createmember" component={CreateMember} props={props} />
      <AuthRoute path="/editmember" component={EditMember} props={props} />
      <AuthRoute path="/events" component={Events} props={props} />
      <AuthRoute path="/createevent" component={CreateEvent} props={props} />
      <AuthRoute path="/editevent" component={EditEvent} props={props} />
      <AuthRoute path="/questions" component={Questions} props={props} />
      <AuthRoute
        path="/createquestion"
        component={CreateQuestion}
        props={props}
      />
      <AuthRoute path="/" component={Home} props={props} />
    </Switch>
  );
};

export default Routes;
