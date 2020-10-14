import React from 'react';
import {
  ClickAwayListener,
  Paper,
  Popper,
  MenuList,
  MenuItem,
  IconButton,
} from '@material-ui/core';
import { requestRoute } from 'History/index';
import { ProfileAvatar } from 'Components/index';

export const ProfileMenu: React.FC = () => {
  const [anchor, setAnchor] = React.useState(null);

  const handleMenuOpen = (e: React.MouseEvent) => {
    setAnchor(e.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  const handleLogout = () => {
    // this.props.logout();
  };

  const handleClick = (action: string) => {
    switch (action) {
      case 'profile':
        requestRoute('/profile');
        break;
      case 'account':
        requestRoute('/account');
        break;
      case 'logout':
        // this.props.logout();
        break;
      default:
        break;
    }
    setAnchor(null);
  };

  const open = Boolean(anchor);
  return (
    <React.Fragment>
      <IconButton style={{ padding: 0 }} onClick={handleMenuOpen}>
        <ProfileAvatar />
      </IconButton>
      <Popper open={open} anchorEl={anchor}>
        <Paper>
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList>
              <MenuItem onClick={() => handleClick('profile')}>
                Profile
              </MenuItem>
              <MenuItem onClick={() => handleClick('account')}>
                Account
              </MenuItem>
              <MenuItem onClick={() => handleClick('logout')}>Logout</MenuItem>
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </React.Fragment>
  );
};
