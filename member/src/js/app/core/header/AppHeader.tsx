import React from 'react';
import { AppBar, Toolbar, IconButton, makeStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { ProfileMenu } from './ProfileMenu';
import { MessengerLink } from './Messages';
import { BalanceButton } from './BalanceButton';
import { Grid, Box } from 'Components/index';
import { Logo } from './Logo';
import { requestRoute } from 'App/router/History';

const useStyles = makeStyles((theme) => ({
  appbar: {
    backgroundColor: theme.palette.navigation.main,
    color: theme.palette.navigation.contrastText,
  },
}));

export const UnauthAppHeader: React.FC = () => {
  const styles = useStyles();
  return (
    <AppBar position="static" className={styles.appbar}>
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
  const styles = useStyles();
  return (
    <AppBar position="static" className={styles.appbar}>
      <Grid.Default>
        <Toolbar disableGutters>
          <Box clone ml={-1} mr={1}>
            <IconButton
              color="inherit"
              aria-label="Menu"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Logo onClick={() => requestRoute('/home')} fg={1} />
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
