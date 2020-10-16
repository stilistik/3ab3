import React from 'react';
import { Input } from '@material-ui/core';

import styles from './Chats.less';
import { useTranslation } from 'react-i18next';

export const SearchChat = ({ search, setSearch }) => {
  const { t } = useTranslation();
  const onInputChange = (e) => setSearch(e.target.value);

  return (
    <Input
      value={search}
      onChange={onInputChange}
      className={styles.userInput}
      disableUnderline
      placeholder={t('Search chat')}
    />
  );
};
