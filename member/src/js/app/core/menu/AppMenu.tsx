import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { SwipeableDrawer, List, Divider } from '@material-ui/core';
import { MenuItem } from './MenuItem';
import { requestRoute } from 'App/router/History';
import { useTranslation } from 'react-i18next';
import { useCurrentUser } from 'Components/index';
import { UserRole } from 'Graphql/types';

// preload image
const image = new Image();
image.src = '/drawer.jpg';

const useStyles = makeStyles({
  drawer: {
    background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0)), url('/drawer.jpg')`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    width: '260px',
  },
  divider: {
    background: '#898989',
  },
});

interface AppMenuProps {
  drawerOpen: boolean;
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppMenu: React.FC<AppMenuProps> = ({
  drawerOpen,
  setDrawerOpen,
}) => {
  const styles = useStyles();
  const user = useCurrentUser();
  const { t } = useTranslation();

  const onClick = (route: string) => {
    setDrawerOpen(false);
    requestRoute(route);
  };

  const hasAccess =
    user.role === UserRole.Admin || user.role === UserRole.Super;

  const createMenuItems = () => {
    return (
      <React.Fragment>
        <List>
          <MenuItem
            text={t('Home')}
            icon="home"
            onClick={() => onClick('/home')}
          />
          <MenuItem
            text={t('Events')}
            icon="event"
            onClick={() => onClick('/events')}
          />
          <MenuItem
            text={t('Documents')}
            icon="description"
            onClick={() => onClick('/documents')}
          />
        </List>
        {hasAccess && (
          <React.Fragment>
            <Divider className={styles.divider} />
            <List>
              <MenuItem
                text={t('Dashboard')}
                icon="dashboard"
                onClick={() => onClick('/dashboard')}
              />
              <MenuItem
                text={t('Checklist')}
                icon="shoppingCart"
                onClick={() => onClick('/checklist')}
              />
              <MenuItem
                text={t('Transactions')}
                icon="creditCard"
                onClick={() => onClick('/transactions')}
              />
              <MenuItem
                text={t('Members')}
                icon="group"
                onClick={() => onClick('/members')}
              />
              <MenuItem
                text={t('Products')}
                icon="localBar"
                onClick={() => onClick('/products')}
              />
              <MenuItem
                text={t('Secrets')}
                icon="style"
                onClick={() => onClick('/secrets')}
              />
            </List>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  };

  return (
    <SwipeableDrawer
      classes={{ paper: styles.drawer }}
      variant="temporary"
      anchor="left"
      open={drawerOpen}
      onOpen={() => setDrawerOpen(true)}
      onClose={() => setDrawerOpen(false)}
    >
      {createMenuItems()}
    </SwipeableDrawer>
  );
};
