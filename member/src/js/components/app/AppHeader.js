import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import './AppHeader.css';

class AppHeader extends React.Component {
  render() {
    return (
      <div styleName="root">
        <AppBar position="static">
          <Toolbar>
            <IconButton
              styleName="menu-button"
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography styleName="grow" variant="h5" color="inherit">
              3ab3
            </Typography>
            <Button styleName="menu-button" color="inherit">
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default AppHeader;
