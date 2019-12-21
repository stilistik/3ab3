import React from 'react';
import { MessageGroup } from './Message';
import { CreateMessage } from './CreateMessage';
import { ScrollContainer } from './ScrollContainer';
import { Button } from '@material-ui/core';
import { Icon } from 'Components';

import styles from './Messages.less';

export const Messages = ({
  messageGroups,
  selectedUser,
  currentUser,
  subscribe,
  loadMore,
}) => {
  const [down, setDown] = React.useState(false);
  const [request, setRequest] = React.useState(null);

  React.useEffect(() => {
    subscribe();
  }, []);

  const onDown = () => {
    setRequest('bottom');
  };

  const onScroll = (element, pos, height) => {
    // if not at bottom, show scroll down button
    if (pos > height - 5) setDown(true);
    else setDown(false);

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
        selectedUser={selectedUser}
        currentUser={currentUser}
        onCreateMessage={onCreateMessage}
      />
    </div>
  );
};
