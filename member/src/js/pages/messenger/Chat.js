import React from 'react';
import { UserAvatar } from 'Components';
import { ListItem, Badge } from '@material-ui/core';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import classnames from 'classnames';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { useInterval } from 'Utils';

import styles from './Chats.less';

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-EN');

export const UNREAD_MESSAGES = gql`
  query($userId: ID!, $chatId: ID!) {
    unreadMessagesCount(userId: $userId, chatId: $chatId)
  }
`;

const NEW_MESSAGES_SUBSCRIPTION = gql`
  subscription($chatId: ID!) {
    onNewMessage(chatId: $chatId) {
      node {
        id
        date
        from {
          id
        }
      }
    }
  }
`;

export const Chat = ({ onSelectChat, chat, currentUser, selected }) => {
  const unsubscribe = React.useRef(null);
  const { subscribeToMore, loading, error, data } = useQuery(UNREAD_MESSAGES, {
    variables: { userId: currentUser.id, chatId: chat.id },
  });

  const subscribe = () => {
    unsubscribe.current = subscribeToMore({
      document: NEW_MESSAGES_SUBSCRIPTION,
      variables: { chatId: chat.id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        let count = prev.unreadMessagesCount;
        const { onNewMessage } = subscriptionData.data;
        if (onNewMessage.node.from.id === currentUser.id) return prev;
        const userLastSeen = chat.lastSeen[currentUser.id];
        if (new Date(onNewMessage.node.date) - new Date(userLastSeen) > 0) {
          count++;
        }
        return { unreadMessagesCount: count };
      },
    });
  };

  React.useEffect(() => {
    subscribe();
    return () => unsubscribe.current();
  }, []);

  if (loading || error) return null;

  const user = chat.members.filter((el) => el.id !== currentUser.id)[0];
  const unread = data.unreadMessagesCount;

  const cls = classnames(styles.chat, {
    [styles.selected]: selected,
  });

  return (
    <ListItem button className={cls} onClick={() => onSelectChat(chat)}>
      <div className={styles.chatInner}>
        <UserAvatar user={user} />
        <span style={{ marginRight: 20 }}>{user.name}</span>
        <Badge
          color="secondary"
          badgeContent={String(unread)}
          invisible={unread === 0}
        />
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
