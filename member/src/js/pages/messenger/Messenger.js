import React from 'react';
import { DefaultGrid, Container } from 'Components';
import { ChatData } from './Chats';
import Messages from './Messages';
import { Grid } from '@material-ui/core';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import styles from './Messenger.less';

const USER = gql`
  query {
    currentUser {
      id
    }
  }
`;

export const Messenger = () => {
  const [selectedUser, setSelectedUser] = React.useState(null);

  const { loading, error, data } = useQuery(USER);
  if (loading || error) return null;

  const onSelectUser = (userId) => setSelectedUser(userId);
  return (
    <DefaultGrid>
      <Grid container spacing={3} style={{ padding: '0px 24px' }}>
        <Grid item xs={3}>
          <ChatData
            onSelectUser={onSelectUser}
            selectedUser={selectedUser}
            currentUser={data.currentUser}
          />
        </Grid>
        <Grid item xs={9}>
          <Messages
            currentUser={data.currentUser}
            selectedUser={selectedUser}
          />
        </Grid>
      </Grid>
    </DefaultGrid>
  );
};
