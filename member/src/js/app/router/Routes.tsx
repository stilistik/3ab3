import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import history from 'App/router/History';
import { Loading } from 'Components/feedback';

const LoginForm = React.lazy(() => import('Pages/login/LoginForm'));
const LoginEmailSent = React.lazy(() => import('Pages/login/LoginEmailSent'));
const Authenticating = React.lazy(() => import('Pages/login/Authenticating'));
const Home = React.lazy(() => import('Pages/home/Home'));
const Dashboard = React.lazy(() => import('Pages/dashboard/Dashboard'));
const Checklist = React.lazy(() => import('Pages/checklist/Checklist'));
const Messenger = React.lazy(() => import('Pages/messenger/Messenger'));
const Account = React.lazy(() => import('Pages/account/Account'));
const Profile = React.lazy(() => import('Pages/profile/Profile'));
const AllEvents = React.lazy(() => import('Pages/events/AllEvents'));
const SingleEvent = React.lazy(() => import('Pages/events/SingleEvent'));
const ProductList = React.lazy(() => import('Pages/products/ProductList'));
const MemberList = React.lazy(() => import('Pages/members/MemberList'));
const Documents = React.lazy(() => import('Pages/documents/Documents'));
const Secrets = React.lazy(() => import('Pages/secrets/Secrets'));
const Transactions = React.lazy(() =>
  import('Pages/transactions/Transactions')
);

export const UnauthenticatedRoutes: React.FC = () => {
  return (
    <React.Suspense fallback={<Loading />}>
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
    </React.Suspense>
  );
};

export const AuthenticatedRoutes: React.FC = () => {
  return (
    <React.Suspense fallback={<Loading />}>
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
        <Route path="/transactions">
          <Transactions />
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
        <Route path="/secrets">
          <Secrets />
        </Route>

        {/* Nothing matched, redirect to home */}
        <Redirect
          from="/"
          to={{ pathname: '/home', state: history.location.state }}
        />
      </Switch>
    </React.Suspense>
  );
};
