import createHistory from 'history/createBrowserHistory';
import qs from 'qs';

const history = createHistory();

export const requestRoute = (path, params) => {
  history.push({
    pathname: path,
    search: qs.stringify(params),
  });
};

export default history;
