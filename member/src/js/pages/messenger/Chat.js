import React from 'react';
import { UserAvatar } from 'Components';
import { ListItem, Badge } from '@material-ui/core';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import classnames from 'classnames';

import styles from './Chats.less';

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-EN');

export const Chat = ({ onSelectChat, chat, currentUser, selected }) => {
  const user = chat.members.filter((el) => el.id !== currentUser.id)[0];

  const cls = classnames(styles.chat, {
    [styles.selected]: selected,
  });
  return (
    <ListItem button className={cls} onClick={() => onSelectChat(chat)}>
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
};
