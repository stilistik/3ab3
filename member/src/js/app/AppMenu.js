import React from 'react';
import { SwipeableDrawer, List, Divider } from '@material-ui/core';
import MenuItem from './MenuItem';
import { requestRoute } from 'History';

import styles from './AppMenu.css';

class AppMenu extends React.Component {
  componentDidMount = () => {
    // preload image
    this.image = new Image();
    this.image.src = '/drawer.jpg';
  };

  onClick = (route) => {
    this.props.setDrawerOpen(false);
    requestRoute(route);
  };

  createMenuItems = () => {
    return (
      <div>
        <Divider />
        <List>
          <MenuItem
            text="Home"
            icon="home"
            onClick={() => this.onClick('home')}
          />
          <MenuItem
            text="History"
            icon="payment"
            onClick={() => this.onClick('history')}
          />
        </List>
        <Divider className={styles.divider} />
        <List>
          <MenuItem
            text="Dashboard"
            icon="dashboard"
            onClick={() => this.onClick('dashboard')}
          />
          <MenuItem
            text="Events"
            icon="event"
            onClick={() => this.onClick('events')}
          />
          <MenuItem
            text="Members"
            icon="group"
            onClick={() => this.onClick('members')}
          />
          <MenuItem
            text="Products"
            icon="drinks"
            onClick={() => this.onClick('products')}
          />
        </List>
      </div>
    );
  };

  render() {
    const items = this.createMenuItems();
    return (
      <SwipeableDrawer
        classes={{ paper: styles.drawer }}
        variant="temporary"
        anchor="left"
        open={this.props.drawerOpen}
        onOpen={() => this.props.setDrawerOpen(true)}
        onClose={() => this.props.setDrawerOpen(false)}
      >
        {items}
      </SwipeableDrawer>
    );
  }
}

export default AppMenu;
