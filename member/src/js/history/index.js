import createHistory from 'history/createBrowserHistory';
import qs from 'qs';

const history = createHistory();

export const requestRoute = (path, params) => {
  history.push({
    pathname: path,
    search: qs.stringify(params),
  });
};

export const getQueryParams = () => {
  return qs.parse(history.location.search.slice(1));
};

export default history;
