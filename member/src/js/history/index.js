import { createBrowserHistory } from 'history';
import qs from 'qs';

const history = createBrowserHistory();

/**
 * Pushes a new location on to the current browser history.
 * @param {String} path: The requested path
 * @param {{ Object, String, Boolean }} options: The optional options parameter with
 * a params object to be stringified, an already stringified search string or a
 * reset flag to reset the query string.
 */
export const requestRoute = (path, { params, search, reset } = {}) => {
  let newSearch = history.location.search;
  if (params) newSearch = stringifyParams(params);
  else if (search) newSearch = search;
  else if (reset) newSearch = '';
  history.push({
    pathname: path,
    search: newSearch,
  });
};

/**
 * Updates the search params in the URL without changing the path
 * @param {Object} params: An objet with the new params. It will be
 * merged with the existing search params.
 */
export const updateParams = (params) => {
  const oldParams = getQueryParams();
  const newParams = Object.assign({}, oldParams, params);
  const search = stringifyParams(newParams);
  history.replace({
    pathname: history.location.pathname,
    search: search,
  });
};

/**
 * Returns the query parameters from the current URL
 * @returns {Object}: the current query parameters
 */
export const getQueryParams = () => {
  return qs.parse(history.location.search.slice(1));
};

/**
 * Returns a query param string from a set of params.
 * @param {Object} params: The params object to turn into a string
 * @returns {String}: The string of query params
 */
export const stringifyParams = (params) => {
  return qs.stringify(params);
};

/**
 * Returns the current location
 * @returns {Object}: The current location
 */
export const getCurrentLocation = () => {
  return history.location;
};

export default history;