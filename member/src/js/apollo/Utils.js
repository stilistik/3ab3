/**
 * Utility function to override resource location. This is used when
 * a local development client has to be connected to a remote server
 * @param {*} path: An resource path as fetched from zenith. Can be absolute or
 * relative
 */
export const getResourceURL = (path) => {
  return path;
};

/**
 * Accessor to get the backend location. The backend location changes based on the
 * deployment target, it is different for a cloud and on premise deployment.
 */
export const getBackendUrl = () => {
  return `${window.location.protocol}//${window.location.hostname}:4000`;
};
