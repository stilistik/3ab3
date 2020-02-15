import React from 'react';
import { DefaultGrid, Box, Grid } from 'Components';
import SwipeableViews from 'react-swipeable-views';
import { ChatManager } from './ChatManager';
import { MessageManager } from './MessageManager';
import { Hidden } from '@material-ui/core';
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
    <Grid.Fix container spacing={3}>
      <Grid.Fix item xs={4}>
        <ChatManager {...props} />
      </Grid.Fix>
      <Grid.Fix item xs={8}>
        <MessageManager {...props} />
      </Grid.Fix>
    </Grid.Fix>
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
    <Box h="100%" o="hidden">
      <Grid.Default fix>
        <Hidden smUp>
          <MobileMessenger {...props} />
        </Hidden>
        <Hidden xsDown>
          <DesktopMessenger {...props} />
        </Hidden>
      </Grid.Default>
    </Box>
  );
};
