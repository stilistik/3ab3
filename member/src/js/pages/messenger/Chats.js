import React from 'react';
import { List } from '@material-ui/core';
import { Chat } from './Chat';

import styles from './Chats.less';

export const Chats = ({ selectedChat, chats, ...rest }) => {
  React.useEffect(() => {
    if (!selectedChat && chats.length) rest.onSelectChat(chats[0]);
  }, []);

  return (
    <div className={styles.container}>
      <List className={styles.list}>
        {chats.map((chat) => {
          const selected = selectedChat ? chat.id === selectedChat.id : false;
          return (
            <Chat key={chat.id} chat={chat} selected={selected} {...rest} />
          );
        })}
      </List>
    </div>
  );
};
