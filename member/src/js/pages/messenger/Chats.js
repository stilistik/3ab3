import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { List, ListItem, Typography, Badge } from '@material-ui/core';
import { UserAvatar } from 'Components';
import classnames from 'classnames';

import styles from './Chats.less';

const QUERY = gql`
  query {
    users {
      id
      name
      avatar
      isOnline
    }
  }
`;

export const Chats = ({ onSelectUser, selectedUser, currentUser }) => {
  const { loading, error, data } = useQuery(QUERY);
  if (loading || error) return null;

  const users = data.users.filter((el) => el.id !== currentUser.id);
  return (
    <div className={styles.outer}>
      <Typography variant="h4" className={styles.header}>
        <strong>Chats</strong>
      </Typography>
      <div className={styles.container}>
        <List className={styles.list}>
          {users.map((user) => {
            const selected = user.id === selectedUser;
            const cls = classnames(styles.chat, {
              [styles.selected]: selected,
            });
            return (
              <ListItem
                key={user.id}
                button
                className={cls}
                onClick={() => onSelectUser(user.id)}
              >
                <div className={styles.chatInner}>
                  <UserAvatar user={user} />
                  <span>{user.name}</span>
                </div>
                <div className={styles.status}>
                  {user.isOnline && (
                    <Badge
                      variant="dot"
                      classes={{ badge: styles.badge }}
                    />
                  )}
                </div>
              </ListItem>
            );
          })}
        </List>
      </div>
    </div>
  );
};
