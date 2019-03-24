import React from 'react';
import { Avatar } from '@material-ui/core';
import { Icon } from 'Components';
import LikedBy from './LikedBy';

import styles from './LikeCounter.css';

export class LikeCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  onOpen = () => this.setState({ open: true });

  onClose = () => this.setState({ open: false });

  render() {
    const { likedBy, classes } = this.props;
    return (
      <div className={classes.root}>
        <Avatar className={classes.circle} onClick={this.onOpen}>
          <Icon type="like" className={classes.icon} />
        </Avatar>
        <span className={classes.number}>{likedBy.length}</span>
        <LikedBy
          likedBy={likedBy}
          open={this.state.open}
          onClose={this.onClose}
        />
      </div>
    );
  }
}

LikeCounter.defaultProps = {
  classes: {
    root: styles.root,
    circle: styles.circle,
    number: styles.number,
    icon: styles.icon,
  },
};
