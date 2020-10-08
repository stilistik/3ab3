import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { SwipeableDrawer, List, Divider } from '@material-ui/core';
import MenuItem from './MenuItem';
import { requestRoute } from 'History';
import { Box } from 'Components';

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

const AppMenu = (props) => {
  const classes = useStyles();

  const onClick = (route) => {
    props.setDrawerOpen(false);
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
        <Divider className={classes.divider} />
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
      classes={{ paper: classes.drawer }}
      variant="temporary"
      anchor="left"
      open={props.drawerOpen}
      onOpen={() => props.setDrawerOpen(true)}
      onClose={() => props.setDrawerOpen(false)}
    >
      {createMenuItems()}
    </SwipeableDrawer>
  );
};

export default AppMenu;
