import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import {
  Divider,
  Avatar,
  Drawer,
  Dialog,
  DialogTitle,
  Hidden,
} from '@material-ui/core';
import { Icon, UserAvatar } from 'Components';

import styles from './StatsBar.css';

export const STATS = gql`
  query($postId: ID!) {
    post(postId: $postId) {
      comments {
        id
      }
      likedBy {
        id
        name
        avatar
      }
    }
  }
`;

const LikedBy = ({ likedBy }) => {
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
        <LikedBy likedBy={likedBy} />
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
        <LikedBy likedBy={likedBy} />
      </Dialog>
    );
  }
}

class LikeIndicator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  onOpen = () => this.setState({ open: true });

  onClose = () => this.setState({ open: false });

  render() {
    const { likedBy } = this.props;
    return (
      <div className={styles.stats}>
        <Avatar className={styles.circle} onClick={this.onOpen}>
          <Icon type="like" className={styles.icon} />
        </Avatar>
        <span className={styles.number}>{likedBy.length}</span>
        <Hidden smUp>
          <MobileDrawer
            likedBy={likedBy}
            open={this.state.open}
            onClose={this.onClose}
          />
        </Hidden>
        <Hidden xsDown>
          <DesktopDialog
            likedBy={likedBy}
            open={this.state.open}
            onClose={this.onClose}
          />
        </Hidden>
      </div>
    );
  }
}

const CommentIndicator = ({ comments, onComment }) => {
  return (
    <div className={styles.stats}>
      <Avatar className={styles.circle} onClick={onComment}>
        <Icon type="comment" className={styles.icon} />
      </Avatar>
      <span className={styles.number}>{comments.length}</span>
    </div>
  );
};

class StatsBar extends React.Component {
  render() {
    if (!this.props.post) return null;
    const { likedBy, comments } = this.props.post;
    return (
      <div className={styles.container}>
        <div className={styles.bar}>
          <LikeIndicator likedBy={likedBy} />
          <CommentIndicator
            comments={comments}
            onComment={this.props.onComment}
          />
        </div>
        <Divider />
      </div>
    );
  }
}

export default graphql(STATS, {
  props: ({ data }) => ({ post: data.post }),
})(StatsBar);
