import createHistory from 'history/createBrowserHistory';

const history = createHistory();

export const requestRoute = (path) => {
  history.push({
    pathname: path,
    search: history.location.search,
  });
};

export default history;
