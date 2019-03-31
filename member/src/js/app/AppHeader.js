import React from 'react';
import { connect } from 'react-redux';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { logout } from 'Redux/actions';
import ProfileMenu from './ProfileMenu';
import BalanceDisplay from './BalanceDisplay';
import { DefaultGrid } from 'Components';

import styles from './AppHeader.css';

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
        <DefaultGrid>
          <Toolbar>
            <IconButton
              className={styles.button}
              color="inherit"
              aria-label="Menu"
              onClick={() => this.props.setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              styleName="brand"
              variant="h4"
              color="inherit"
              className={styles.typo}
            >
              3ab3
            </Typography>
            <BalanceDisplay />
            <ProfileMenu />
          </Toolbar>
        </DefaultGrid>
      </AppBar>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(AppHeader);
