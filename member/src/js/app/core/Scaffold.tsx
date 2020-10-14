import React from 'react';
import { AuthAppHeader, UnauthAppHeader } from './header';
import { AppMenu } from './menu';

export const UnauthenticatedScaffold = () => {
  return (
    <React.Fragment>
      <UnauthAppHeader />
    </React.Fragment>
  );
};

export const AuthenticatedScaffold = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <AuthAppHeader setDrawerOpen={setOpen} />
      <AppMenu drawerOpen={open} setDrawerOpen={setOpen} />
    </React.Fragment>
  );
};
