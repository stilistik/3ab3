import { createBrowserHistory } from 'history';
import qs from 'qs';

const history = createBrowserHistory();

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
