import React from 'react';
import { Menu, MenuItem, IconButton, Typography } from '@material-ui/core';
import { requestRoute } from 'History/index';
import { Box, Icon, ProfileAvatar } from 'Components/index';

interface ProfileMenuItemProps {
  label: string;
  icon: string;
  action: string;
  onClick: (action: string) => void;
}

const ProfileMenuItem = React.forwardRef(
  (
    { label, action, icon, onClick }: ProfileMenuItemProps,
    ref: React.MutableRefObject<HTMLLIElement>
  ): JSX.Element => {
    return (
      <MenuItem ref={ref} onClick={() => onClick(action)}>
        <Box.Row height="30px" cmrnl={2}>
          <Icon type={icon} />
          <Typography variant="body1">{label}</Typography>
        </Box.Row>
      </MenuItem>
    );
  }
);

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

  return (
    <React.Fragment>
      <IconButton style={{ padding: 0 }} onClick={handleMenuOpen}>
        <ProfileAvatar />
      </IconButton>
      <Menu
        anchorEl={anchor}
        getContentAnchorEl={null}
        keepMounted
        open={Boolean(anchor)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        style={{ marginTop: 5 }}
      >
        <ProfileMenuItem
          label="Profile"
          action="profile"
          icon="accountCircle"
          onClick={handleClick}
        />
        <ProfileMenuItem
          label="Account"
          action="account"
          icon="settings"
          onClick={handleClick}
        />
        <ProfileMenuItem
          label="Logout"
          action="logout"
          icon="exitToApp"
          onClick={handleClick}
        />
      </Menu>
    </React.Fragment>
  );
};
