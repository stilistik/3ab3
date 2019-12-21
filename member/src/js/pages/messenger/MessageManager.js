import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Messages } from './Messages';

export const MESSAGES = gql`
  query Messages(
    $fromId: ID!
    $toId: ID!
    $first: Int!
    $after: String
    $skip: Int
  ) {
    messages(
      fromId: $fromId
      toId: $toId
      first: $first
      after: $after
      skip: $skip
    ) {
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

export const MessageManager = ({ selectedUser, currentUser }) => {
  if (!selectedUser) return null;

  const cursor = React.useRef(null);
  let fetching = React.useRef(false);

  const { fetchMore, subscribeToMore, loading, error, data } = useQuery(
    MESSAGES,
    {
      variables: {
        fromId: currentUser.id,
        toId: selectedUser,
        first: 30,
      },
    }
  );

  if (loading || error) return null;

  const onSubscribe = () => {
    subscribeToMore({
      document: NEW_MESSAGES_SUBSCRIPTION,
      variables: { toId: currentUser.id, fromId: selectedUser },
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

  const onLoadMore = async () => {
    if (fetching.current) return;
    fetching.current = true;

    await fetchMore({
      variables: {
        fromId: currentUser.id,
        toId: selectedUser,
        after: cursor.current,
        first: 10,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
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
    <Messages
      key={currentUser.id + selectedUser}
      messageGroups={groups}
      selectedUser={selectedUser}
      currentUser={currentUser}
      subscribe={onSubscribe}
      loadMore={onLoadMore}
    />
  );
};
