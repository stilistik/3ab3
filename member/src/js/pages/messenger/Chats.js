import React from 'react';
import { List } from '@material-ui/core';
import { Chat } from './Chat';

import styles from './Chats.less';

export const Chats = ({ selectedChat, chats, ...rest }) => {
  React.useEffect(() => {
    if (!selectedChat && chats.length) rest.onSelectChat(chats[0].id);
  }, []);

  return (
    <div className={styles.container}>
      <List className={styles.list}>
        {chats.map((chat) => {
          const selected = chat.id === selectedChat.id;
          return (
            <Chat key={chat.id} chat={chat} selected={selected} {...rest} />
          );
        })}
      </List>
    </div>
  );
};
