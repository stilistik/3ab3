import React from 'react';
import { IconButton, Typography } from '@material-ui/core';
import { UserAvatar } from 'Components';

import styles from './MemberItem.css';

class MemberItem extends React.Component {
  onClick = () => {
    this.props.onClick(this.props.user.id);
  };

  render() {
    const { user } = this.props;
    return (
      <div className={styles.memberitem}>
        <IconButton className={styles.button} onClick={this.onClick}>
          <UserAvatar
            user={user}
            classes={{ avatar: styles.avatar, typo: styles.typo }}
          />
        </IconButton>
        <Typography>{user.name}</Typography>
      </div>
    );
  }
}

export default MemberItem;
