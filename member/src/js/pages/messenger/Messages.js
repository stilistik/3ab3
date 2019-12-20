import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { MessageGroup } from './Message';
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

const NEW_MESSAGES_SUBSCRIPTION = gql`
  subscription($fromId: ID!, $toId: ID!) {
    onNewMessage(fromId: $fromId, toId: $toId) {
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
`;

const groupMessages = (messages, currentUserId) => {
  let lastDate = null;
  const thresh = 1000 * 60; // 5 min in ms

  const sorted = messages
    .map((el) => {
      const { date, ...rest } = el.node;
      let diff = 0;
      if (lastDate) diff = new Date(lastDate) - new Date(date);
      lastDate = date;
      return {
        date: diff > thresh ? date : null,
        fromCurrentUser: rest.from.id === currentUserId,
        ...rest,
      };
    })
    .reverse();

  console.log(sorted);

  const groups = [];
  let group = [];
  let prevFromId = null;
  for (let message of sorted) {
    if (message.date || prevFromId !== message.from.id) {
      if (group.length > 0) {
        const groupId = group
          .map((el) => el.id)
          .reduce((acc, curr) => acc + curr, '');
        groups.push({ id: groupId, messages: group });
        group = [];
      }
    }
    group.push(message);
    prevFromId = message.from.id;
  }
  const groupId = group
    .map((el) => el.id)
    .reduce((acc, curr) => acc + curr, '');
  groups.push({ id: groupId, messages: group });
  return groups;
};

export const MessagesQuery = ({ selectedUser, currentUser }) => {
  const { subscribeToMore, loading, error, data } = useQuery(MESSAGES, {
    variables: {
      fromId: currentUser.id,
      toId: selectedUser,
      first: 20,
    },
  });

  if (loading || error) return null;

  const messageGroups = groupMessages(data.messages.edges, currentUser.id);

  return (
    <Messages
      messageGroups={messageGroups}
      selectedUser={selectedUser}
      currentUser={currentUser}
      subscribe={() =>
        subscribeToMore({
          document: NEW_MESSAGES_SUBSCRIPTION,
          variables: { toId: currentUser.id, fromId: selectedUser },
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            console.log(prev, subscriptionData.data);
            const newMessage = {
              ...subscriptionData.data.onNewMessage,
              __typename: 'MessageEdge',
            };
            const newObject = Object.assign({}, prev, {
              messages: {
                edges: [newMessage, ...prev.messages.edges],
                __typename: 'MessageConnection',
              },
            });
            return newObject;
          },
        })
      }
    />
  );
};

const Messages = ({ messageGroups, selectedUser, currentUser, subscribe }) => {
  const container = React.createRef(null);

  React.useEffect(() => {
    subscribe();
  }, []);

  React.useLayoutEffect(() => {
    const element = container.current;
    if (element) element.scrollTop = element.scrollHeight;
  }, [messageGroups]);

  return (
    <div className={styles.outer}>
      <div className={styles.container} ref={container}>
        <div className={styles.content}>
          {messageGroups.map((group) => {
            return <MessageGroup key={group.id} messages={group.messages} />;
          })}
        </div>
      </div>
      <CreateMessage selectedUser={selectedUser} currentUser={currentUser} />
    </div>
  );
};

export default MessagesQuery;
