declare const __API_HOST__: string;
declare const __API_PORT__: string;

/**
 * Accessor to get the backend location. The backend location changes based on the
 * deployment target, it is different for a cloud and on premise deployment.
 */
export const getBackendUrl = () => {
  return `${__API_HOST__}:${__API_PORT__}`;
};
