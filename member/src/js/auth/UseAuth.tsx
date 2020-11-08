import { requestRoute } from 'App/router';
import { setIsAuthenticated, useStore } from 'App/store';

export const useAuth = () => {
  const { state, dispatch } = useStore();

  const login = (access_token: string) => {
    window.localStorage.setItem('access_token', access_token);
    dispatch(setIsAuthenticated(true));
    requestRoute('/home');
  };

  const logout = () => {
    window.localStorage.removeItem('access_token');
    dispatch(setIsAuthenticated(false));
    requestRoute('/login');
  };

  return { login, logout };
};
