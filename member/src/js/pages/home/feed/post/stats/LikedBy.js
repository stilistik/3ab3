import React from 'react';
import {
  Hidden,
  Drawer,
  Divider,
  Dialog,
  DialogTitle,
} from '@material-ui/core';
import { UserAvatar } from 'Components';

import styles from './LikedBy.css';

const LikeList = ({ likedBy }) => {
  return (
    <div className={styles.likedby}>
      {likedBy.map((user) => {
        return (
          <div key={user.id} className={styles.like}>
            <UserAvatar user={user} className={styles.avatar} />
            <span>{user.name}</span>
          </div>
        );
      })}
    </div>
  );
};

class MobileDrawer extends React.Component {
  render() {
    const { likedBy } = this.props;
    return (
      <Drawer
        anchor="bottom"
        open={this.props.open}
        onClose={this.props.onClose}
        classes={{ paper: styles.drawer }}
      >
        <DialogTitle className={styles.title}>Liked by</DialogTitle>
        <Divider />
        <LikeList likedBy={likedBy} />
      </Drawer>
    );
  }
}

class DesktopDialog extends React.Component {
  render() {
    const { likedBy, open, onClose } = this.props;
    return (
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="xs"
        fullWidth={true}
        scroll="paper"
        classes={{ scrollPaper: styles.paper }}
      >
        <DialogTitle className={styles.title}>Liked by</DialogTitle>
        <Divider />
        <LikeList likedBy={likedBy} />
      </Dialog>
    );
  }
}

class LikedBy extends React.Component {
  render() {
    const { likedBy, open, onClose } = this.props;
    return (
      <div>
        <Hidden smUp>
          <MobileDrawer likedBy={likedBy} open={open} onClose={onClose} />
        </Hidden>
        <Hidden xsDown>
          <DesktopDialog likedBy={likedBy} open={open} onClose={onClose} />
        </Hidden>
      </div>
    );
  }
}

export default LikedBy;
