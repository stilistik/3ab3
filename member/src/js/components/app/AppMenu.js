import React from 'react';
import {
  SwipeableDrawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import InboxIcon from '@material-ui/icons/Inbox';

class AppMenu extends React.Component {
  createMenuItems = () => {
    return (
      <div>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );
  };

  render() {
    const items = this.createMenuItems();
    return (
      <SwipeableDrawer
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
