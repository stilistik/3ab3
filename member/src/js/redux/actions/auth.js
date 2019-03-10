export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const login = (access_token) => {
  return { type: LOGIN, access_token };
};

export const logout = () => {
  return { type: LOGOUT };
};
