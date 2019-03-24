import React from 'react';
import { Avatar } from '@material-ui/core';
import { Icon } from 'Components';
import LikedBy from './LikedBy';
import styles from './LikeCounter.css';

class LikeCounter extends React.Component {
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
        <LikedBy
          likedBy={likedBy}
          open={this.state.open}
          onClose={this.onClose}
        />
      </div>
    );
  }
}

export default LikeCounter;
