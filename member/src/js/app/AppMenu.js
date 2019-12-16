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
            text={<span className={styles.item}>Home</span>}
            icon="home"
            onClick={() => this.onClick('home')}
          />
          <MenuItem
            text={<span className={styles.item}>Events</span>}
            icon="event"
            onClick={() => this.onClick('events')}
          />
        </List>
        <Divider className={styles.divider} />
        <List>
          <MenuItem
            text={<span className={styles.item}>Dashboard</span>}
            icon="dashboard"
            onClick={() => this.onClick('dashboard')}
          />
          <MenuItem
            text={<span className={styles.item}>Checklist</span>}
            icon="shoppingCart"
            onClick={() => this.onClick('checklist')}
          />
          <MenuItem
            text={<span className={styles.item}>Members</span>}
            icon="group"
            onClick={() => this.onClick('members')}
          />
          <MenuItem
            text={<span className={styles.item}>Products</span>}
            icon="localBar"
            onClick={() => this.onClick('products')}
          />
          <MenuItem
            text={<span className={styles.item}>Three Steps</span>}
            icon="linearScale"
            onClick={() => this.onClick('questions')}
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
