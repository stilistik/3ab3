import createHistory from 'history/createBrowserHistory';

const history = createHistory();

export const requestRoute = (path, search) => {
  if (!search) search = history.location.search;
  history.push({
    pathname: path,
    search: search,
  });
};

export default history;
