import React from 'react';
import { IconButton, Badge } from '@material-ui/core';
import { requestRoute } from 'History';
import { Icon } from 'Components';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import styles from './Messages.less';

export const TOTAL_UNREAD_MESSAGES = gql`
  query {
    currentUser {
      id
      unreadMessages
    }
  }
`;

const MessengerLink = () => {
  const { loading, error, data } = useQuery(TOTAL_UNREAD_MESSAGES);

  if (loading || error) return null;

  const onClick = () => {
    requestRoute('/messenger');
  };

  const count = data.currentUser.unreadMessages;
  return (
    <IconButton onClick={onClick}>
      <Badge
        badgeContent={String(count)}
        classes={{ badge: styles.badge }}
        invisible={count === 0}
      >
        <Icon type="mail" className={styles.icon} />
      </Badge>
    </IconButton>
  );
};

export default MessengerLink;
