import React from 'react';
import { IconButton, Badge } from '@material-ui/core';
import { requestRoute } from 'History';
import { Icon } from 'Components';

import styles from './Messages.less';

const MessengerLink = () => {
  const onClick = () => {
    requestRoute('/messenger');
  };

  return (
    <IconButton onClick={onClick}>
      <Badge badgeContent={3} classes={{ badge: styles.badge }}>
        <Icon type="mail" className={styles.icon} />
      </Badge>
    </IconButton>
  );
};

export default MessengerLink;
