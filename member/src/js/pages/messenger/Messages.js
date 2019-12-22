import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { MessageGroup } from './Message';
import { CreateMessage } from './CreateMessage';
import { ScrollContainer } from './ScrollContainer';
import { Button } from '@material-ui/core';
import { Icon } from 'Components';

import styles from './Messages.less';

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

export const Messages = ({
  messageGroups,
  selectedChat,
  currentUser,
  refetch,
  subscribe,
  unsubscribe,
  loadMore,
}) => {
  const [down, setDown] = React.useState(true);
  const [request, setRequest] = React.useState(null);
  const [disableAnim, setDisableAnim] = React.useState(true);

  React.useEffect(() => {
    // refresh the messages of current chat on mount
    refetch();
    subscribe();
    setDisableAnim(false);
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
  };

  const onScroll = (element, pos, height) => {
    // if not at bottom, show scroll down button
    if (pos === height) {
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
