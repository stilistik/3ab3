import React from 'react';
import { List, ListItem, Typography, Badge } from '@material-ui/core';
import { UserAvatar } from 'Components';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import classnames from 'classnames';

import styles from './Chats.less';

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-EN');

export const Chats = ({ onSelectUser, selectedUser, users }) => {
  React.useEffect(() => {
    if (!selectedUser) onSelectUser(users[0].id);
  }, []);

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
                  {user.isOnline ? (
                    <Badge variant="dot" classes={{ badge: styles.badge }} />
                  ) : (
                    user.lastOnline && (
                      <span className={styles.lastOnline}>
                        {timeAgo.format(new Date(user.lastOnline), 'twitter')}
                      </span>
                    )
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
