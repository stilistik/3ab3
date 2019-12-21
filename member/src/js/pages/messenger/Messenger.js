import React from 'react';
import { DefaultGrid } from 'Components';
import { ChatManager } from './ChatManager';
import { MessageManager } from './MessageManager';
import { Grid } from '@material-ui/core';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const USER = gql`
  query {
    currentUser {
      id
    }
  }
`;

export const Messenger = () => {
  const [selectedChat, setSelectedChat] = React.useState({});

  const { loading, error, data } = useQuery(USER);
  if (loading || error) return null;

  const onSelectChat = (chat) => setSelectedChat(chat);
  return (
    <DefaultGrid>
      <Grid container spacing={3} style={{ padding: '0px 24px' }}>
        <Grid item xs={4}>
          <ChatManager
            selectedChat={selectedChat}
            onSelectChat={onSelectChat}
            currentUser={data.currentUser}
          />
        </Grid>
        <Grid item xs={8}>
          <MessageManager
            currentUser={data.currentUser}
            selectedChat={selectedChat}
          />
        </Grid>
      </Grid>
    </DefaultGrid>
  );
};
