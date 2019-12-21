import React from 'react';
import { Input } from '@material-ui/core';

import styles from './Chats.less';

export const SearchChat = ({ search, setSearch }) => {
  const onInputChange = (e) => setSearch(e.target.value);

  return (
    <Input
      value={search}
      onChange={onInputChange}
      className={styles.userInput}
      disableUnderline
      placeholder="Search chat"
    />
  );
};
