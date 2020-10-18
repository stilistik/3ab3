import React from 'react';
import { Button, Input, IconButton, makeStyles } from '@material-ui/core';
import { Icon } from 'Components';
import { useEmojiContext } from './EmojiContext';
import { List } from 'react-virtualized';

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
    overflow: 'hidden',
    marginBottom: '10px',
    borderRadius: '10px',
    background: theme.palette.action.default,
  },
  list: {
    width: '100%',
  },
  row: {
    display: 'flex',
  },
  emoji: {
    minWidth: '10px',
    minHeight: '10px',
    height: '45px',
    width: '55px',
    fontSize: '30px',
    borderRadius: '5px',
    cursor: 'pointer',
    padding: '7px',
    lineHeight: '30px',
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

const Emoji = ({ emoji, onClick }) => {
  const styles = useStyles();
  if (!emoji.code_points) return null;
  const codepoint = '0x' + emoji.code_points.base;
  const unicode = parseInt(codepoint, 16);

  const handleClick = () => {
    onClick({ ...emoji, unicode });
  };

  return (
    <Button className={styles.emoji} onClick={handleClick}>
      {String.fromCodePoint(unicode)}
    </Button>
  );
};

const EmojiList = ({ emojis, handleSelect }) => {
  const styles = useStyles();
  const container = React.createRef();
  const [width, setWidth] = React.useState(0);
  const [count, setCount] = React.useState(10);

  React.useLayoutEffect(() => {
    const width = container.current.clientWidth;
    const count = Math.floor(width / 55);
    setWidth(width);
    setCount(count);
  }, []);

  const emojiListToBloc = (emojisList) => {
    let emojisBlocs = [];
    let emojisByCategByBloc = {};
    let bloc_by_category = {};
    //Build blocs of 6 emojis for each categories
    emojisList
      .sort((a, b) => a.order - b.order)
      .forEach((emoji) => {
        let category = emoji.category;
        if (!bloc_by_category[category]) {
          bloc_by_category[category] = 0;
        }
        let bloc = bloc_by_category[category];
        if (!emojisByCategByBloc[category]) {
          emojisByCategByBloc[category] = [];
        }
        if (!emojisByCategByBloc[category][bloc]) {
          emojisByCategByBloc[category].push([]);
        }
        emojisByCategByBloc[category][bloc].push(emoji);
        if (emojisByCategByBloc[category][bloc].length == count) {
          bloc_by_category[category]++;
        }
      });
    //Build final list of blocs with category names
    Object.keys(emojisByCategByBloc).forEach((category) => {
      emojisBlocs = emojisBlocs.concat(emojisByCategByBloc[category]);
    });
    return emojisBlocs;
  };

  const blocks = emojiListToBloc(Object.values(emojis));
  return (
    <div ref={container} className={styles.list}>
      <List
        width={width}
        height={220}
        rowCount={blocks.length}
        rowHeight={50}
        rowRenderer={({ key, index, isScrolling, isVisible, style }) => {
          return (
            <div className={styles.row} style={style} key={key}>
              {blocks[index].map((emoji, idx) => {
                if (emoji) {
                  return (
                    <Emoji key={idx} emoji={emoji} onClick={handleSelect} />
                  );
                }
              })}
            </div>
          );
        }}
      />
    </div>
  );
};

const EmojiSearch = ({ value, onChange, handleClose }) => {
  const styles = useStyles();
  return (
    <div className={styles.search}>
      <Input
        value={value}
        onChange={onChange}
        disableUnderline
        className={styles.searchInput}
        placeholder="Search emoji"
      />
      <IconButton onClick={handleClose}>
        <Icon type="close" />
      </IconButton>
    </div>
  );
};

export const EmojiPicker = ({ handleSelect, handleClose }) => {
  const styles = useStyles();
  const { list, searchable } = useEmojiContext();
  const [value, setValue] = React.useState('');

  const search = (query) => {
    query = query.toLocaleLowerCase().replace(':', '');

    var candidates = [];
    var maxResults = 30;
    Object.keys(searchable).forEach((keyword) => {
      if (candidates.length > maxResults) {
        return false;
      }
      if (keyword.startsWith(query)) {
        searchable[keyword].forEach((emoji) => {
          if (candidates.indexOf(emoji) == -1) {
            candidates.push(emoji);
          }
        });
      }
    });
    //Sort by no tones first, then by default emoji order
    candidates.sort((a, b) => {
      if (a.diversity && !b.diversity) {
        return 1;
      }
      if (!a.diversity && b.diversity) {
        return -1;
      }
      return a.order - b.order;
    });
    return candidates;
  };

  let emojis = list;
  if (value) emojis = search(value);

  const onChange = (e) => setValue(e.target.value);

  return (
    <div className={styles.container}>
      <div className={styles.picker}>
        <EmojiSearch
          value={value}
          onChange={onChange}
          handleClose={handleClose}
        />
        <EmojiList emojis={emojis} handleSelect={handleSelect} />
      </div>
    </div>
  );
};
