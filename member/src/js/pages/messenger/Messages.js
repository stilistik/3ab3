import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { MessageGroup } from './Message';
import { CreateMessage } from './CreateMessage';
import { ScrollContainer } from './ScrollContainer';
import { Button, Badge } from '@material-ui/core';
import { Icon } from 'Components';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import styles from './Messages.less';
import { UNREAD_MESSAGES } from './Chat';
import { TOTAL_UNREAD_MESSAGES } from 'App/Messages';

const DownButton = ({ show, onClick, unreadCount }) => {
  return (
    <TransitionGroup>
      {show ? (
        <CSSTransition
          classNames={{
            enter: styles['down-enter'],
            enterActive: styles['down-enter-active'],
            exit: styles['down-exit'],
            exitActive: styles['down-exit-active'],
          }}
          timeout={{ enter: 300, exit: 300 }}
        >
          <div className={styles.down}>
            <Badge
              color="error"
              overlap="circle"
              badgeContent={String(unreadCount)}
              invisible={unreadCount === 0}
            >
              <Button
                className={styles.downBtn}
                variant="contained"
                color="secondary"
                onClick={onClick}
              >
                <Icon type="down" />
              </Button>
            </Badge>
          </div>
        </CSSTransition>
      ) : null}
    </TransitionGroup>
  );
};

const USER_LAST_SEEN = gql`
  mutation($userId: ID!, $chatId: ID!) {
    userLastSeen(userId: $userId, chatId: $chatId) {
      id
    }
  }
`;

export const Messages = ({
  messageGroups,
  selectedChat,
  currentUser,
  refetch,
  subscribe,
  unsubscribe,
  loadMore,
  down,
  setDown,
  unreadCount,
  setUnreadCount,
}) => {
  const scrollApi = React.useRef(null);
  const initState = React.useRef(true);
  const [disableAnim, setDisableAnim] = React.useState(true);
  const [userLastSeen] = useMutation(USER_LAST_SEEN);

  React.useEffect(() => {
    // refresh the messages of current chat on mount
    refetch();
    subscribe();
    setDisableAnim(false);
    onUserLastSeen();
    return () => unsubscribe();
  }, []);

  React.useEffect(() => {
    // if the messages change and we are at the bottom of
    // the container, we want to stay there
    if (down) scrollApi.current.scrollToBottom();
    setDisableAnim(false);
  }, [messageGroups]);

  const onDown = () => {
    scrollApi.current.scrollToBottom();
    onUserLastSeen();
  };

  const onScroll = (element, pos, height) => {
    // if not at bottom, show scroll down button
    if (pos === height) {
      setDown(true);
      onUserLastSeen();
      setUnreadCount(0);
    } else {
      setDown(false);
    }

    // if near top, fetch more messages
    if (pos < 100) {
      loadMore();
      initState.current = false;
      setDisableAnim(true);
    }
  };

  const onCreateMessage = () => {
    scrollApi.current.scrollToBottom();
  };

  const onUserLastSeen = () => {
    userLastSeen({
      variables: {
        userId: currentUser.id,
        chatId: selectedChat.id,
      },
      refetchQueries: () => [
        {
          query: UNREAD_MESSAGES,
          variables: { userId: currentUser.id, chatId: selectedChat.id },
        },
        {
          query: TOTAL_UNREAD_MESSAGES,
        },
      ],
    });
  };

  const getApi = (api) => (scrollApi.current = api);

  return (
    <div className={styles.outer}>
      <DownButton show={!down} onClick={onDown} unreadCount={unreadCount} />
      <ScrollContainer
        onScroll={onScroll}
        getApi={getApi}
        initState={initState}
      >
        {messageGroups.map((group, idx) => {
          return (
            <MessageGroup
              key={idx}
              disableAnimations={disableAnim}
              {...group}
            />
          );
        })}
      </ScrollContainer>
      <CreateMessage
        selectedChat={selectedChat}
        currentUser={currentUser}
        onCreateMessage={onCreateMessage}
      />
    </div>
  );
};
