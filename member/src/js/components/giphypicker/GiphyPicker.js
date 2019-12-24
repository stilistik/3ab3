import React from 'react';
import {
  Button,
  Input,
  IconButton,
  GridList,
  GridListTile,
} from '@material-ui/core';
import { Icon } from 'Components';
import { useGiphyContext } from './GiphyContext';
import { List } from 'react-virtualized';

import styles from './GiphyPicker.less';

const GifPreview = ({ gif }) => {
  return <img src={gif.preview} className={styles.video} />;
};

const GiphyList = ({ gifs, handleSelect, colCount }) => {
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

export const GiphyPicker = ({ handleSelect, handleClose, colCount }) => {
  const { gifs, pagination, search, setSearch } = useGiphyContext();

  const onChange = (e) => setSearch(e.target.value);

  return (
    <div className={styles.picker}>
      <GiphySearch
        value={search}
        onChange={onChange}
        handleClose={handleClose}
      />
      <GiphyList gifs={gifs} handleSelect={handleSelect} colCount={colCount} />
    </div>
  );
};

GiphyPicker.defaultProps = {
  colCount: 3,
};
