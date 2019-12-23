import React from 'react';

export const GiphyContext = React.createContext({});

export const useGiphyContext = () => React.useContext(GiphyContext);

export const GiphyProvider = ({ children }) => {
  const IDLE_TO_UPDATE = 300;
let timer = React.useRef(null);
  const fetching = React.useRef(null);

  const [state, setState] = React.useState(null);
  const [search, setSearch] = React.useState('');

  const query = () => {
    fetching.current = true;
    const url = search
      ? `https://api.giphy.com/v1/gifs/search?api_key=6uQAwtwV81nvklU2DTGhA6OTQObAETQP&q=${search}&limit=25&offset=0&rating=G&lang=en`
      : 'https://api.giphy.com/v1/gifs/trending?api_key=6uQAwtwV81nvklU2DTGhA6OTQObAETQP&limit=25&rating=G';

    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        const gifs = json.data.map((el) => ({
          id: el.id,
          title: el.title,
          preview: el.images.preview_webp.url,
          image: el.images.downsized_large.url,
        }));
        const pagination = json.pagination;
        setState({ gifs, pagination });
        fetching.current = false;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    // clear existing timeouts when there is continued user input
    if (timer || fetching) clearTimeout(timer);

    // setup new timer that will run when there is no user input
    timer = setTimeout(() => {
      // run updates
      query();
    }, IDLE_TO_UPDATE);
  }, [search]);

  const value = {
    search,
    setSearch,
    gifs: state ? state.gifs : [],
    pagination: state ? state.pagination : null,
  };

  return (
    <GiphyContext.Provider value={value}>{children}</GiphyContext.Provider>
  );
};

export default GiphyProvider;
