import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Icon } from 'Components';

import styles from './MenuItem.css';

class MenuItem extends React.Component {
  render() {
    return (
      <ListItem
        className={styles.item}
        button
        key={this.props.text}
        onClick={this.props.onClick}
      >
        <ListItemIcon classes={{ root: styles.text }}>
          <Icon type={this.props.icon} />
        </ListItemIcon>
        <ListItemText
          classes={{ primary: styles.text }}
          primary={this.props.text}
        />
      </ListItem>
    );
  }
}

export default MenuItem;
