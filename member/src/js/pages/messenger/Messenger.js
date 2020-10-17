import React from 'react';
import { Icon, Box, Grid } from 'Components';
import SwipeableViews from 'react-swipeable-views';
import { ChatManager } from './ChatManager';
import { MessageManager } from './MessageManager';
import { Hidden, Button, Typography, makeStyles } from '@material-ui/core';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { CreateMessage } from './CreateMessage';

const USER = gql`
  query {
    currentUser {
      id
    }
  }
`;

export const DesktopMessenger = (props) => {
  return (
    <Grid.Default>
      <Box.Flex row>
        <ChatManager {...props} />
        <Box.Flex column h="100%" w="100%" ox="hidden">
          <Box.Item fg={1} oy="auto">
            <MessageManager {...props} />
          </Box.Item>
          <CreateMessage {...props} />
        </Box.Flex>
      </Box.Flex>
    </Grid.Default>
  );
};

const useStyles = makeStyles({
  createButton: {
    width: '50px',
    minWidth: '50px',
    height: '50px',
    minHeight: '50px',
    borderRadius: '25px',
    marginRight: '15px',
  },
});

const MobileMessagesHeader = ({ onClick, selectedChat }) => {
  const styles = useStyles();
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
      <Typography variant="h5" color="textPrimary">
        {selectedChat?.title}
      </Typography>
    </Box>
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
    <Box.Flex column h="100%" w="100%">
      <SwipeableViews
        axis="x"
        index={value}
        onChangeIndex={handleChangeIndex}
        containerStyle={{ height: '100%' }}
      >
        <Box px={2} ox="hidden">
          <ChatManager onSelectChat={handleSelectChat} {...rest} />
        </Box>
        <Box.Flex column h="100%" w="100%">
          <MobileMessagesHeader
            onSelectChat={handleSelectChat}
            onClick={handleBack}
            {...rest}
          />
          <Box.Item fg={1} oy="auto">
            <MessageManager
              onBack={handleBack}
              onSelectChat={handleSelectChat}
              {...rest}
            />
          </Box.Item>
          <CreateMessage {...rest} />
        </Box.Flex>
      </SwipeableViews>
    </Box.Flex>
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
    <React.Fragment>
      <Hidden smUp>
        <MobileMessenger {...props} />
      </Hidden>
      <Hidden xsDown>
        <DesktopMessenger {...props} />
      </Hidden>
    </React.Fragment>
  );
};
