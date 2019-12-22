import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { MessageGroup } from './Message';
import { CreateMessage } from './CreateMessage';
import { ScrollContainer } from './ScrollContainer';
import { Button } from '@material-ui/core';
import { Icon } from 'Components';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import styles from './Messages.less';
import { UNREAD_MESSAGES } from './Chat';
import { TOTAL_UNREAD_MESSAGES } from 'App/Messages';

const DownButton = ({ show, onClick }) => {
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
          <Button
            className={styles.down}
            variant="contained"
            color="secondary"
            onClick={onClick}
          >
            <Icon type="down" />
          </Button>
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
}) => {
  const [request, setRequest] = React.useState(null);
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
    if (down) setRequest('bottom');
    setDisableAnim(false);
  }, [messageGroups]);

  const onDown = () => {
    setRequest('bottom');
    onUserLastSeen();
  };

  const onScroll = (element, pos, height) => {
    // if not at bottom, show scroll down button
    if (pos === height) {
      onUserLastSeen();
      setDown(true);
    } else {
      setDown(false);
    }

    // if near top, fetch more messages
    if (pos < 100) {
      loadMore();
      setDisableAnim(true);
    }
  };

  const onCreateMessage = () => {
    setRequest('bottom');
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

  return (
    <div className={styles.outer}>
      <DownButton show={!down} onClick={onDown} />
      <ScrollContainer
        onScroll={onScroll}
        request={request}
        setRequest={setRequest}
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
