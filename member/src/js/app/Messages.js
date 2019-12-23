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

const NEW_MESSAGES_SUBSCRIPTION = gql`
  subscription($toId: ID!) {
    onNewMessage(toId: $toId) {
      node {
        id
        date
        from {
          id
        }
        chat {
          id
          lastSeen
        }
      }
    }
  }
`;

const MessengerLink = () => {
  const unsubscribe = React.useRef(null);
  const { subscribeToMore, loading, error, data } = useQuery(
    TOTAL_UNREAD_MESSAGES
  );

  const onSubscribe = () => {
    unsubscribe.current = subscribeToMore({
      document: NEW_MESSAGES_SUBSCRIPTION,
      variables: { toId: data.currentUser.id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        let count = prev.currentUser.unreadMessages;
        const { onNewMessage } = subscriptionData.data;
        if (onNewMessage.node.from.id === data.currentUser.id) return prev;
        const userLastSeen =
          onNewMessage.node.chat.lastSeen[data.currentUser.id];
        if (new Date(onNewMessage.node.date) - new Date(userLastSeen) > 0) {
          count++;
        }
        const currentUser = Object.assign({}, prev.currentUser, {
          unreadMessages: count,
        });
        return { currentUser };
      },
    });
  };

  const onUnsubscribe = () => {
    if (unsubscribe.current) unsubscribe.current();
  };

  if (loading || error) return null;

  const onClick = () => {
    requestRoute('/messenger');
  };

  const count = data.currentUser.unreadMessages;
  return (
    <MessageButton
      count={count}
      subscribe={onSubscribe}
      unsubscribe={onUnsubscribe}
      onClick={onClick}
    />
  );
};

const MessageButton = ({ count, subscribe, unsubscribe, onClick }) => {
  React.useEffect(() => {
    subscribe();
    return () => unsubscribe();
  }, []);

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
