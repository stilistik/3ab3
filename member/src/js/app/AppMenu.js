import React from 'react';
import { SwipeableDrawer, List, Divider } from '@material-ui/core';
import MenuItem from './MenuItem';

import styles from './AppMenu.css';

class AppMenu extends React.Component {
  componentDidMount = () => {
    // preload image
    this.image = new Image();
    this.image.src = '/drawer.jpg';
  };

  onClick = (e) => {
    console.log(e);
    this.props.setDrawerOpen(false);
  };

  createMenuItems = () => {
    return (
      <div>
        <Divider />
        <List>
          <MenuItem text="Home" icon="home" onClick={this.onClick} />
          <MenuItem text="Payments" icon="payment" onClick={this.onClick} />
        </List>
        <Divider className={styles.divider} />
        <List>
          <MenuItem text="Dashboard" icon="dashboard" onClick={this.onClick} />
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
