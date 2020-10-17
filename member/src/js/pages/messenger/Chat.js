import React from 'react';
import { UserAvatar } from 'Components';
import { ListItem, Badge, makeStyles } from '@material-ui/core';
import classnames from 'classnames';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { useLanguage } from 'App/intl';

const useStyles = makeStyles((theme) => ({
  chat: {
    borderRadius: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '5px',
    paddingLeft: '10px',
    color: theme.palette.text.primary,
  },
  chatInner: {
    display: 'flex',
    alignItems: 'center',
    '& > *:not(:last-child)': {
      marginRight: '10px',
    },
  },
  badge: {
    backgroundColor: theme.palette.success.main,
  },
  lastOnline: {
    color: '#999',
    fontSize: '12px',
  },
  selected: {
    backgroundColor: theme.palette.action.hover,
  },
}));

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

export const Chat = ({
  onSelectChat,
  chat,
  currentUser,
  selected,
  down,
  setUnreadCount,
}) => {
  const styles = useStyles();
  const { timeAgo } = useLanguage();
  const unsubscribe = React.useRef(null);
  const { subscribeToMore, loading, error, data } = useQuery(UNREAD_MESSAGES, {
    variables: { userId: currentUser.id, chatId: chat.id },
  });

  const count = data ? data.unreadMessagesCount : 0;

  React.useEffect(() => {
    if (selected) setUnreadCount(count);
  }, [count]);

  const subscribe = () => {
    unsubscribe.current = subscribeToMore({
      document: NEW_MESSAGES_SUBSCRIPTION,
      variables: { chatId: chat.id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data || (down && selected)) return prev;
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
          color="error"
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
