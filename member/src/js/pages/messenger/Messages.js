import React from 'react';
import { MessageGroup } from './Message';
import { CreateMessage } from './CreateMessage';
import { ScrollContainer } from './ScrollContainer';
import { Button } from '@material-ui/core';
import { Icon } from 'Components';

import styles from './Messages.less';

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

  React.useEffect(() => {
    // refresh the messages of current chat on mount
    refetch();
    subscribe();
    return () => unsubscribe();
  }, []);

  React.useEffect(() => {
    // if the messages change and we are at the bottom of
    // the container, we want to stay there
    if (down) setRequest('bottom');
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
    if (pos < 100) loadMore();
  };

  const onCreateMessage = () => {
    setRequest('bottom');
  };

  return (
    <div className={styles.outer}>
      {!down && (
        <Button
          className={styles.down}
          variant="contained"
          color="secondary"
          onClick={onDown}
        >
          <Icon type="down" />
        </Button>
      )}
      <ScrollContainer
        onScroll={onScroll}
        request={request}
        setRequest={setRequest}
      >
        {messageGroups.map((group) => {
          return <MessageGroup key={group.id} messages={group.messages} />;
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
