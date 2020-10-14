import React from 'react';
import { IconButton, Badge, makeStyles } from '@material-ui/core';
import { requestRoute } from 'App/router/History';
import { Icon } from 'Components/index';
import { useQuery } from '@apollo/react-hooks';
import { TOTAL_UNREAD_MESSAGES } from 'Graphql/queries';
import { NEW_MESSAGES_SUBSCRIPTION } from 'Graphql/subscriptions';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: 'white',
  },
  badge: {
    color: 'white',
    backgroundColor: theme.palette.error.main,
  },
}));

interface MessageButtonProps {
  count: number;
  subscribe: () => void;
  unsubscribe: () => void;
  onClick: (e: React.MouseEvent) => void;
}

const MessageButton: React.FC<MessageButtonProps> = ({
  count,
  subscribe,
  unsubscribe,
  onClick,
}) => {
  const styles = useStyles();

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

export const MessengerLink: React.FC = () => {
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
        if (
          new Date(onNewMessage.node.date).getTime() -
            new Date(userLastSeen).getTime() >
          0
        ) {
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

  const handleClick = () => {
    requestRoute('/messenger');
  };

  const count = data.currentUser.unreadMessages;
  return (
    <MessageButton
      count={count}
      subscribe={onSubscribe}
      unsubscribe={onUnsubscribe}
      onClick={handleClick}
    />
  );
};
