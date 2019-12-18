import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Message } from './Message';
import { CreateMessage } from './CreateMessage';

import styles from './Messages.less';

export const MESSAGES = gql`
  query($fromId: ID!, $toId: ID!, $first: Int!, $after: String) {
    messages(fromId: $fromId, toId: $toId, first: $first, after: $after) {
      edges {
        node {
          id
          text
          link
          date
          from {
            id
          }
          to {
            id
          }
        }
      }
    }
  }
`;

export const MessagesQuery = ({ selectedUser, currentUser }) => {
  const { loading, error, data } = useQuery(MESSAGES, {
    variables: {
      fromId: currentUser.id,
      toId: selectedUser,
      first: 20,
    },
  });

  if (loading || error) return null;

  let lastDate = null;
  const thresh = 1000 * 60; // 5 min in ms
  const messages = data.messages.edges
    .map((el) => {
      const { date, ...rest } = el.node;
      let diff = 0;
      if (lastDate) diff = new Date(lastDate) - new Date(date);
      lastDate = date;
      return {
        date: diff > thresh ? date : null,
        ...rest,
      };
    })
    .reverse();
  return (
    <Messages
      messages={messages}
      selectedUser={selectedUser}
      currentUser={currentUser}
    />
  );
};

const Messages = ({ messages, selectedUser, currentUser }) => {
  const container = React.createRef(null);
  React.useLayoutEffect(() => {
    const element = container.current;
    if (element) element.scrollTop = element.scrollHeight;
  }, [messages]);

  return (
    <div className={styles.outer}>
      <div className={styles.container} ref={container}>
        <div className={styles.content}>
          {messages.map((message) => {
            return (
              <Message
                key={message.id}
                {...message}
                fromCurrentUser={message.from.id === currentUser.id}
              />
            );
          })}
        </div>
      </div>
      <CreateMessage selectedUser={selectedUser} currentUser={currentUser} />
    </div>
  );
};

export default MessagesQuery;
