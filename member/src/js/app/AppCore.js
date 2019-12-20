import React from 'react';
import AppHeader from './AppHeader';
import AppMenu from './AppMenu';

const AppCore = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <AppHeader setDrawerOpen={setOpen} />
      <AppMenu drawerOpen={open} setDrawerOpen={setOpen} />
    </div>
  );
};

export default AppCore;
