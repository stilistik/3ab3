import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { SwipeableDrawer, List, Divider } from '@material-ui/core';
import { MenuItem } from './MenuItem';
import { requestRoute } from 'History/index';

// preload image
const image = new Image();
image.src = '/drawer.jpg';

const useStyles = makeStyles({
  drawer: {
    background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0)), url('/drawer.jpg')`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    width: '260px',
  },
  divider: {
    background: '#898989',
  },
});

interface AppMenuProps {
  drawerOpen: boolean;
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppMenu: React.FC<AppMenuProps> = ({
  drawerOpen,
  setDrawerOpen,
}) => {
  const styles = useStyles();

  const onClick = (route: string) => {
    setDrawerOpen(false);
    requestRoute(route);
  };

  const createMenuItems = () => {
    return (
      <React.Fragment>
        <List>
          <MenuItem text="Home" icon="home" onClick={() => onClick('/home')} />
          <MenuItem
            text="Events"
            icon="event"
            onClick={() => onClick('/events')}
          />
        </List>
        <Divider className={styles.divider} />
        <List>
          <MenuItem
            text="Dashboard"
            icon="dashboard"
            onClick={() => onClick('/dashboard')}
          />
          <MenuItem
            text="Checklist"
            icon="shoppingCart"
            onClick={() => onClick('/checklist')}
          />
          <MenuItem
            text="Members"
            icon="group"
            onClick={() => onClick('/members')}
          />
          <MenuItem
            text="Products"
            icon="localBar"
            onClick={() => onClick('/products')}
          />
        </List>
      </React.Fragment>
    );
  };

  return (
    <SwipeableDrawer
      classes={{ paper: styles.drawer }}
      variant="temporary"
      anchor="left"
      open={drawerOpen}
      onOpen={() => setDrawerOpen(true)}
      onClose={() => setDrawerOpen(false)}
    >
      {createMenuItems()}
    </SwipeableDrawer>
  );
};
