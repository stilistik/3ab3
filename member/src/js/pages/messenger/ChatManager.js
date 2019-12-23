import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { Grid, Button, Typography } from '@material-ui/core';
import { Icon } from 'Components';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useInterval } from 'Utils';
import { Chats } from './Chats';
import { CreateChat } from './CreateChat';
import { SearchChat } from './SearchChat';

import styles from './Chats.less';

export const CHATS_QUERY = gql`
  query {
    currentUser {
      id
      chats {
        id
        title
        members {
          id
          name
          avatar
          isOnline
        }
        lastMessage {
          date
        }
        lastSeen
      }
    }
  }
`;

const CreateChatButton = ({ onClick }) => {
  return (
    <Button
      className={styles.createButton}
      color="secondary"
      variant="outlined"
      onClick={onClick}
    >
      <Icon type="add" />
    </Button>
  );
};

const buildSearchableChats = (chats) => {
  let searchable = {};
  for (let chat of chats) {
    let keywords =
      chat.members.map((el) => el.name).join(' ') + ' ' + chat.title;

    keywords = keywords
      .split(' ')
      .map((keyword) => keyword.trim().toLocaleLowerCase());

    for (let keyword of keywords) {
      if (!searchable[keyword]) {
        searchable[keyword] = [];
      }
      searchable[keyword] = searchable[keyword].concat(chat);
    }
  }
  return searchable;
};

export const ChatList = (props) => {
  const [search, setSearch] = React.useState('');
  const { loading, error, data, refetch } = useQuery(CHATS_QUERY);

  useInterval(() => {
    refetch();
  }, 2000);

  if (loading || error) return null;

  const onCreateChat = () => {
    props.onViewChange(1);
  };

  const filterChats = (chats, search) => {
    if (!search) return chats;
    const searchable = buildSearchableChats(chats);
    const keys = Object.keys(searchable).filter((el) =>
      el.includes(search.toLowerCase())
    );
    let result = [];
    for (let key of keys) {
      result = result.concat(searchable[key]);
      result = Object.values(
        result.reduce((acc, cur) => Object.assign(acc, { [cur.id]: cur }), {})
      );
    }
    return result;
  };

  const sortChats = (chats) => {
    return chats.sort((a, b) => {
      if (!a.lastMessage && !b.lastMessage) return 0;
      else if (a.lastMessage && !b.lastMessage) return -1;
      else if (!a.lastMessage && b.lastMessage) return 1;
      else return new Date(b.lastMessage.date) - new Date(a.lastMessage.date);
    });
  };

  let chats = filterChats(data.currentUser.chats, search);
  chats = sortChats(chats);
  return (
    <div className={styles.outer}>
      <div className={styles.header}>
        <Typography variant="h4">
          <strong>Chats</strong>
        </Typography>
        <CreateChatButton onClick={onCreateChat} />
      </div>
      <SearchChat search={search} setSearch={setSearch} {...props} />
      <Chats chats={chats} {...props} />
    </div>
  );
};

export const ChatManager = (props) => {
  const [value, setValue] = React.useState(0);
  return (
    <SwipeableViews axis="x" index={value} disabled>
      <Grid container>
        <Grid item xs={12}>
          <ChatList onViewChange={setValue} {...props} />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <CreateChat onViewChange={setValue} {...props} />
        </Grid>
      </Grid>
    </SwipeableViews>
  );
};
