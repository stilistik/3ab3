import React from 'react';
import { connect } from 'react-redux';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { logout } from 'Redux/actions';
import ProfileMenu from './ProfileMenu';

import './AppHeader.css';

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logout());
    },
  };
};

class DefaultHeader extends React.Component {
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
            <Typography styleName="brand" variant="h4" color="inherit">
              3ab3
            </Typography>
            <ProfileMenu />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

class AppHeader extends React.Component {
  render() {
    if (this.props.isAuthenticated) return <DefaultHeader {...this.props} />;
    else return null;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppHeader);
