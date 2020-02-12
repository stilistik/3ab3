import React from 'react';
import { DefaultGrid } from 'Components';
import SwipeableViews from 'react-swipeable-views';
import { ChatManager } from './ChatManager';
import { MessageManager } from './MessageManager';
import { Grid, Hidden } from '@material-ui/core';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const USER = gql`
  query {
    currentUser {
      id
    }
  }
`;

export const DesktopMessenger = (props) => {
  return (
    <Grid container spacing={3} style={{ padding: '0px 24px' }}>
      <Grid item xs={4}>
        <ChatManager {...props} />
      </Grid>
      <Grid item xs={8}>
        <MessageManager {...props} />
      </Grid>
    </Grid>
  );
};

const MobileMessenger = ({ onSelectChat, ...rest }) => {
  const [value, setValue] = React.useState(0);

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleSelectChat = (chat) => {
    setValue(1);
    onSelectChat(chat);
  };

  const handleBack = () => {
    setValue(0);
  };

  return (
    <React.Fragment>
      <SwipeableViews axis="x" index={value} onChangeIndex={handleChangeIndex}>
        <Grid container>
          <Grid item xs={12}>
            <ChatManager onSelectChat={handleSelectChat} {...rest} />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <MessageManager
              onBack={handleBack}
              onSelectChat={handleSelectChat}
              {...rest}
            />
          </Grid>
        </Grid>
      </SwipeableViews>
    </React.Fragment>
  );
};

export const Messenger = () => {
  // the currently selected chat entry
  const [selectedChat, setSelectedChat] = React.useState(null);

  // stores wheather the current chat is scrolled all the way down
  const [down, setDown] = React.useState(true);

  // stores unread messages count of current chat
  const [unreadCount, setUnreadCount] = React.useState(0);

  const { loading, error, data } = useQuery(USER);
  if (loading || error) return null;

  const onSelectChat = (chat) => setSelectedChat(chat);

  const { currentUser } = data;
  const props = {
    currentUser,
    selectedChat,
    onSelectChat,
    down,
    setDown,
    unreadCount,
    setUnreadCount,
  };
  return (
    <DefaultGrid>
      <Hidden smUp>
        <MobileMessenger {...props} />
      </Hidden>
      <Hidden xsDown>
        <DesktopMessenger {...props} />
      </Hidden>
    </DefaultGrid>
  );
};
