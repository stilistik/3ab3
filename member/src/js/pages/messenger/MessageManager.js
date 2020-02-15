import React from 'react';
import gql from 'graphql-tag';
import { Hidden, Button, Typography } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import { Messages } from './Messages';
import { Icon, Box } from 'Components';

import styles from './MessageManager.less';

export const MESSAGES = gql`
  query Messages($chatId: ID!, $first: Int!, $after: String, $skip: Int) {
    messages(chatId: $chatId, first: $first, after: $after, skip: $skip) {
      edges {
        cursor
        node {
          id
          text
          link
          date
          from {
            id
          }
          chat {
            id
          }
        }
      }
    }
  }
`;

const NEW_MESSAGES_SUBSCRIPTION = gql`
  subscription($chatId: ID!) {
    onNewMessage(chatId: $chatId) {
      node {
        id
        text
        link
        date
        from {
          id
        }
        chat {
          id
        }
      }
    }
  }
`;

const groupMessages = (messages, currentUserId) => {
  const sorted = messages
    .map((edge) => {
      const { node } = edge;
      return {
        fromCurrentUser: node.from.id === currentUserId,
        ...node,
      };
    })
    .reverse();

  const dateThresholdExceeded = (nextDate, prevDate) => {
    const thresh = 1000 * 60 * 5; // 5min
    return new Date(nextDate) - new Date(prevDate) > thresh;
  };

  const groups = [];
  let group = [];
  let prevFromId = null;
  let prevDate = null;
  for (let message of sorted) {
    if (dateThresholdExceeded(message.date, prevDate) && group.length) {
      groups.push({ messages: group, groupDate: message.date });
      group = [];
    }
    if (prevFromId !== message.from.id && group.length) {
      groups.push({ messages: group, groupDate: message.date });
      group = [];
    }
    group.push(message);
    prevFromId = message.from.id;
    prevDate = message.date;
  }

  groups.push({ messages: group, groupDate: prevDate });
  return groups;
};

const MobileMessagesHeader = ({ onClick, selectedChat }) => {
  return (
    <Box p={1} w="100%" d="flex" ai="center" bb={1} bc="grey.300">
      <Button
        className={styles.createButton}
        color="secondary"
        variant="outlined"
        onClick={onClick}
      >
        <Icon type="left" />
      </Button>
      <Typography variant="h5">{selectedChat.title}</Typography>
    </Box>
  );
};

export const MessageManager = ({ selectedChat, currentUser, ...rest }) => {
  if (!selectedChat) return null;
  const unsubscribe = React.useRef(null);
  const cursor = React.useRef(null);
  let fetching = React.useRef(false);

  const {
    fetchMore,
    subscribeToMore,
    refetch,
    loading,
    error,
    data,
  } = useQuery(MESSAGES, {
    variables: {
      chatId: selectedChat.id,
      first: 30,
    },
  });

  if (loading || error) return null;

  const onSubscribe = () => {
    unsubscribe.current = subscribeToMore({
      document: NEW_MESSAGES_SUBSCRIPTION,
      variables: { chatId: selectedChat.id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const { onNewMessage } = subscriptionData.data;
        const newMessage = {
          ...onNewMessage,
          cursor: onNewMessage.node.id,
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
    });
  };

  const onUnsubscribe = () => {
    if (unsubscribe.current) unsubscribe.current();
  };

  const onLoadMore = async () => {
    if (fetching.current) return;
    fetching.current = true;

    await fetchMore({
      variables: {
        chatId: selectedChat.id,
        after: cursor.current,
        first: 10,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.messages.edges.length) return prev;
        const newEdges = fetchMoreResult.messages.edges;
        const pageInfo = fetchMoreResult.messages.pageInfo;
        cursor.current = newEdges[newEdges.length - 1].cursor;
        return newEdges.length
          ? {
              messages: {
                __typename: prev.messages.__typename,
                edges: [...prev.messages.edges, ...newEdges],
                pageInfo,
              },
            }
          : previousResult;
      },
    });
    fetching.current = false;
  };

  let groups = [];
  const { edges } = data.messages;
  if (edges.length) {
    cursor.current = edges[edges.length - 1].cursor;
    groups = groupMessages(edges, currentUser.id);
  }

  return (
    <Box.Fill>
      <Hidden smUp>
        <MobileMessagesHeader
          onClick={rest.onBack}
          selectedChat={selectedChat}
        />
      </Hidden>
      <Messages
        key={selectedChat.id}
        messageGroups={groups}
        selectedChat={selectedChat}
        currentUser={currentUser}
        refetch={refetch}
        subscribe={onSubscribe}
        unsubscribe={onUnsubscribe}
        loadMore={onLoadMore}
        {...rest}
      />
    </Box.Fill>
  );
};
