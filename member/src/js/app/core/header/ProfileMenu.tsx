import React from 'react';
import { Menu, MenuItem, IconButton, Typography } from '@material-ui/core';
import { requestRoute } from 'App/router/History';
import { Box, Icon, useCurrentUser, UserAvatar } from 'Components/index';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'Auth/index';

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
          <Typography variant="body1" color="textPrimary">
            {label}
          </Typography>
        </Box.Row>
      </MenuItem>
    );
  }
);

export const ProfileMenu: React.FC = () => {
  const [anchor, setAnchor] = React.useState(null);
  const user = useCurrentUser();
  const { t } = useTranslation();
  const { logout } = useAuth();

  const handleMenuOpen = (e: React.MouseEvent) => {
    setAnchor(e.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
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
        logout();
        break;
      default:
        break;
    }
    setAnchor(null);
  };

  return (
    <React.Fragment>
      <IconButton style={{ padding: 0 }} onClick={handleMenuOpen}>
        <UserAvatar user={user} />
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
          label={t('Profile')}
          action="profile"
          icon="accountCircle"
          onClick={handleClick}
        />
        <ProfileMenuItem
          label={t('Settings')}
          action="account"
          icon="settings"
          onClick={handleClick}
        />
        <ProfileMenuItem
          label={t('Logout')}
          action="logout"
          icon="exitToApp"
          onClick={handleClick}
        />
      </Menu>
    </React.Fragment>
  );
};
