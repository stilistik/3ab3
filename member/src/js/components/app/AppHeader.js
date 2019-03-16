import React from 'react';
import { connect } from 'react-redux';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { logout } from 'Redux/actions';
import ProfileMenu from './ProfileMenu';

import './AppHeader.css';

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logout());
    },
  };
};

class AppHeader extends React.Component {
  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton
            styleName="menu-button"
            color="inherit"
            aria-label="Menu"
            onClick={() => this.props.setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography styleName="brand" variant="h4" color="inherit">
            3ab3
          </Typography>
          <ProfileMenu />
        </Toolbar>
      </AppBar>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(AppHeader);
