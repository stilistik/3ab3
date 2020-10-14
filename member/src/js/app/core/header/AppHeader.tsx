import React from 'react';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { ProfileMenu } from './ProfileMenu';
import { MessengerLink } from './Messages';
import { BalanceButton } from './BalanceButton';
import { Grid, Box } from 'Components/index';
import { Logo } from './Logo';
import { requestRoute } from 'History/index';

export const UnauthAppHeader: React.FC = () => {
  return (
    <AppBar position="static">
      <Grid.Default>
        <Toolbar disableGutters>
          <Logo />
        </Toolbar>
      </Grid.Default>
    </AppBar>
  );
};

interface AuthAppHeaderProps {
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthAppHeader: React.FC<AuthAppHeaderProps> = ({
  setDrawerOpen,
}) => {
  return (
    <AppBar position="static">
      <Grid.Default>
        <Toolbar disableGutters>
          <IconButton
            color="inherit"
            aria-label="Menu"
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Logo onClick={() => requestRoute('/home')} />
          <Box.Row cmrnl={1}>
            <BalanceButton />
            <MessengerLink />
            <ProfileMenu />
          </Box.Row>
        </Toolbar>
      </Grid.Default>
    </AppBar>
  );
};
