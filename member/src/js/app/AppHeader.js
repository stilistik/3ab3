import React from 'react';
import { connect } from 'react-redux';
import { AppBar, Toolbar, IconButton, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { logout } from 'Redux/actions';
import ProfileMenu from './ProfileMenu';
import Invitations from './Invitations';
import Messages from './Messages';
import BalanceButton from './BalanceButton';
import { Grid } from 'Components';
import { Logo } from './Logo.js';
import { requestRoute } from 'History';

import styles from './AppHeader.css';

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logout());
    },
  };
};

export const UnauthAppHeader = connect(
  null,
  mapDispatchToProps
)(() => {
  return (
    <AppBar position="static">
      <Grid.Default>
        <Toolbar disableGutters>
          <Logo />
          <Button
            className={styles.button}
            onClick={() => requestRoute('/login')}
          >
            Login
          </Button>
        </Toolbar>
      </Grid.Default>
    </AppBar>
  );
});

export const AuthAppHeader = connect(
  null,
  mapDispatchToProps
)((props) => {
  return (
    <AppBar position="static">
      <Grid.Default>
        <Toolbar disableGutters>
          <IconButton
            className={styles.button}
            color="inherit"
            aria-label="Menu"
            onClick={() => props.setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Logo />
          <BalanceButton />
          <Messages />
          <Invitations />
          <ProfileMenu />
        </Toolbar>
      </Grid.Default>
    </AppBar>
  );
});
