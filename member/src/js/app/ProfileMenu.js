import React from 'react';
import {
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuList,
  MenuItem,
  IconButton,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { logout } from 'Redux/actions';
import { requestRoute } from 'History';
import { ProfileAvatar } from 'Components';

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logout());
    },
  };
};

class ProfileMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchor: null,
    };
  }

  handleMenuOpen = (e) => {
    this.setState({ anchor: e.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchor: null });
  };

  handleLogout = () => {
    this.props.logout();
  };

  handleClick = (action) => {
    switch (action) {
      case 'profile':
        requestRoute('/profile');
        break;
      case 'account':
        requestRoute('/account');
        break;
      case 'logout':
        this.props.logout();
        break;
      default:
        break;
    }
    this.setState({ anchor: null });
  };

  render() {
    const { anchor } = this.state;
    const open = anchor ? true : false;
    const renderMenu = (
      <Popper
        style={{ marginTop: '5px', zIndex: 100 }}
        open={open}
        anchorEl={this.state.anchor}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            id="menu-list-grow"
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper style={{ background: '#444' }}>
              <ClickAwayListener onClickAway={this.handleClose}>
                <MenuList>
                  }}
                  <MenuItem
                    style={{ color: 'white' }}
                    onClick={() => this.handleClick('account')}
                  >
                    My account
                  </MenuItem>
                  <MenuItem
                    style={{ color: 'white' }}
                    onClick={() => this.handleClick('logout')}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    );

    return (
      <div>
        <IconButton onClick={this.handleMenuOpen}>
          <ProfileAvatar />
        </IconButton>
        {renderMenu}
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(ProfileMenu);
