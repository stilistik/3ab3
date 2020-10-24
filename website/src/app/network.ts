/**
 * Accessor to get the backend location. The backend location changes based on the
 * deployment target, it is different for a cloud and on premise deployment.
 */
export const getBackendUrl = () => {
  return `${window.location.protocol}//172.25.8.212:4000`;
};