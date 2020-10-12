import React from 'react';
import { connect } from 'react-redux';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { logout } from 'Redux/actions';
import ProfileMenu from './ProfileMenu';
import Messages from './Messages';
import BalanceButton from './BalanceButton';
import { Grid, Box } from 'Components';
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
          <Logo onClick={() => requestRoute('/home')} />
          <Box.Row cmrnl={1}>
            <BalanceButton />
            <Messages />
            <ProfileMenu />
          </Box.Row>
        </Toolbar>
      </Grid.Default>
    </AppBar>
  );
});
