import React from 'react';
import { AuthAppHeader, UnauthAppHeader } from './AppHeader';
import AppMenu from './AppMenu';

export const UnauthAppCore = () => {
  return (
    <React.Fragment>
      <UnauthAppHeader />
    </React.Fragment>
  );
};

export const AuthAppCore = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <AuthAppHeader setDrawerOpen={setOpen} />
      <AppMenu drawerOpen={open} setDrawerOpen={setOpen} />
    </React.Fragment>
  );
};
