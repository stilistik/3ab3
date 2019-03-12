import React from 'react';
import { Avatar, Menu, MenuItem, IconButton } from '@material-ui/core';
import { connect } from 'react-redux';
import { logout } from 'Redux/actions';

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

  handleMenuClose = () => {
    this.setState({ anchor: null });
  };

  handleLogout = () => {
    this.props.logout();
  };

  render() {
    const { anchor } = this.state;
    const isMenuOpen = anchor ? true : false;
    const renderMenu = (
      <Menu anchorEl={anchor} open={isMenuOpen} onClose={this.handleMenuClose}>
        <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
      </Menu>
    );

    return (
      <div>
        <IconButton>
          <Avatar
            style={{ backgroundColor: '#1a77ad', cursor: 'pointer' }}
            onClick={this.handleMenuOpen}
          >
            R
          </Avatar>
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
