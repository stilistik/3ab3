import React from 'react';

export const EmojiContext = React.createContext({});

export const useEmojiContext = () => React.useContext(EmojiContext);

const parseEmojiJson = (json) => {
  let reduced = {};
  Object.keys(json).forEach((id) => {
    let emoji = json[id];
    if (emoji.display == 1) {
      if (!emoji.diversity) {
        if (!reduced[id]) {
          reduced[id] = {};
        }
        reduced[id]['default'] = emoji;
        emoji.diversities.forEach((alt_id) => {
          const alt = json[alt_id];
          reduced[id][alt.diversity] = alt;
        });
      }
    }
  });
  return reduced;
};

const createSearchable = (emojis) => {
  let searcheableEmojis = {};
  Object.keys(emojis).forEach((id) => {
    //Get original emoji
    const emoji = emojis[id]['default'];
    //Add emojis to keyword object
    let keywords =
      emoji.keywords.join(' ') +
      ' ' +
      emoji.name +
      ' ' +
      emoji.shortname.substr(1, emoji.shortname.length - 2);

    emoji.shortname_alternates.forEach((shortname) => {
      keywords += ' ' + shortname.substr(1, shortname.length - 2);
    });
    keywords = keywords
      .split(' ')
      .map((keyword) => keyword.trim().toLocaleLowerCase());
    keywords.forEach((keyword) => {
      //Add default emoji + all diversities
      if (!searcheableEmojis[keyword]) {
        searcheableEmojis[keyword] = [];
      }
      searcheableEmojis[keyword] = searcheableEmojis[keyword].concat(
        Object.keys(emojis[id]).map((key) => emojis[id][key])
      );
    });
  });
  return searcheableEmojis;
};

export const EmojiProvider = ({ children }) => {
  const [state, setState] = React.useState(null);

  React.useEffect(() => {
    fetch('emojis.json')
      .then((response) => response.json())
      .then((json) => {
        const list = parseEmojiJson(json);
        const searchable = createSearchable(list);
        setState({
          list: Object.values(list).map((el) => el.default),
          searchable,
        });
      });
  }, []);

  if (!state) return null;
  return (
    <EmojiContext.Provider value={state}>{children}</EmojiContext.Provider>
  );
};

export default EmojiProvider;
