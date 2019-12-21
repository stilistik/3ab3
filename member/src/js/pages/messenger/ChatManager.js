import React from 'react';
import { Typography } from '@material-ui/core';
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
      }
    }
  }
`;

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

export const ChatManager = (props) => {
  const [search, setSearch] = React.useState('');
  const { loading, error, data, refetch } = useQuery(CHATS_QUERY);

  useInterval(() => {
    refetch();
  }, 2000);

  if (loading || error) return null;

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

  const chats = filterChats(data.currentUser.chats, search);
  console.log(chats);

  return (
    <div className={styles.outer}>
      <div className={styles.header}>
        <Typography variant="h4">
          <strong>Chats</strong>
        </Typography>
        <CreateChat />
      </div>
      <SearchChat search={search} setSearch={setSearch} {...props} />
      <Chats chats={chats} {...props} />
    </div>
  );
};
