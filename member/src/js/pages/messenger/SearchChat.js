import React from 'react';
import { Input, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  input: {
    margin: '20px 0px 10px 0px',
    backgroundColor: theme.palette.action.default,
    borderRadius: '15px',
    height: '40px',
    padding: '5px 10px',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  inputFocused: {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const SearchChat = ({ search, setSearch }) => {
  const { t } = useTranslation();
  const styles = useStyles();

  const onInputChange = (e) => setSearch(e.target.value);

  return (
    <Input
      value={search}
      onChange={onInputChange}
      className={styles.input}
      disableUnderline
      placeholder={t('Search chat')}
      classes={{
        focused: styles.inputFocused,
      }}
    />
  );
};
