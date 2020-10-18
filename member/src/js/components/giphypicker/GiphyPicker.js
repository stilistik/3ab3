import React from 'react';
import {
  Input,
  IconButton,
  GridList,
  GridListTile,
  makeStyles,
} from '@material-ui/core';
import { Icon } from 'Components';
import { useGiphyContext } from './GiphyContext';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    maxHeight: '350px',
    padding: theme.spacing(1),
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    height: '100%',
    background: theme.palette.action.default,
    overflow: 'hidden',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  listContainer: {
    width: '100%',
    height: 'calc(350px - 79px)',
    overflowY: 'scroll',
    overflowX: 'hidden',
  },
  list: {
    width: '100%',
  },
  tile: {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
    '&:before': {
      content: '""',
      position: 'absolute',
      top: '0%',
      left: '0%',
      zIndex: '10000',
      width: '100%',
      height: '100%',
      opacity: '0',
      border: `5px solid ${theme.palette.primary.main}`,
      transition: 'all 0.3s ease',
    },
    '&:hover': {
      '&:before': {
        opacity: 1,
      },
    },
  },
  video: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
    minWidth: '100%',
    minHeight: '100%',
    width: 'auto',
    height: 'auto',
    overflow: 'hidden',
  },
  search: {
    display: 'flex',
    width: '100%',
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: '10px 20px',
  },
  searchInput: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: '10px',
    background: theme.palette.action.default,
    padding: '5px 10px',
    flexGrow: '100',
    marginRight: '5px',
    '&:hover': {
      background: theme.palette.action.hover,
    },
  },
}));

const GifPreview = ({ gif }) => {
  const styles = useStyles();
  return <img src={gif.preview} className={styles.video} />;
};

const GiphyList = ({ gifs, handleSelect, colCount }) => {
  const styles = useStyles();
  return (
    <div className={styles.listContainer}>
      <div className={styles.list}>
        <GridList cellHeight={160} cols={colCount}>
          {gifs.map((gif) => (
            <GridListTile
              key={gif.id}
              cols={1}
              className={styles.tile}
              onClick={() => handleSelect(gif)}
            >
              <GifPreview gif={gif} />
            </GridListTile>
          ))}
        </GridList>
      </div>
    </div>
  );
};

const GiphySearch = ({ value, onChange, handleClose }) => {
  const styles = useStyles();
  return (
    <div className={styles.search}>
      <Input
        value={value}
        onChange={onChange}
        disableUnderline
        className={styles.searchInput}
        placeholder="Search gif"
      />
      <IconButton onClick={handleClose}>
        <Icon type="close" />
      </IconButton>
    </div>
  );
};

export const GiphyPicker = ({ handleSelect, handleClose, colCount = 3 }) => {
  const styles = useStyles();
  const { gifs, pagination, search, setSearch } = useGiphyContext();

  const onChange = (e) => setSearch(e.target.value);

  return (
    <div className={styles.container}>
      <div className={styles.picker}>
        <GiphySearch
          value={search}
          onChange={onChange}
          handleClose={handleClose}
        />
        <GiphyList
          gifs={gifs}
          handleSelect={handleSelect}
          colCount={colCount}
        />
      </div>
    </div>
  );
};
