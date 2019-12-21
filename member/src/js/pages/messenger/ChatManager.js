import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useInterval } from 'Utils';
import { Chats } from './Chats';

const QUERY = gql`
  query {
    users {
      id
      name
      avatar
      isOnline
      lastOnline
    }
  }
`;

export const ChatManager = (props) => {
  const { loading, error, data, refetch } = useQuery(QUERY);

  useInterval(() => {
    refetch();
  }, 2000);

  if (loading || error) return null;
  const users = data.users.filter((el) => el.id !== props.currentUser.id);
  return <Chats users={users} {...props} />;
};
