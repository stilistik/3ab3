import { LOGIN, LOGOUT } from '../actions';

const initState = {
  isAuthenticated: false,
};

export const auth = (state = initState, action) => {
  switch (action.type) {
    case LOGIN: {
      window.localStorage.setItem('access_token', action.access_token);
      return Object.assign({}, state, {
        isAuthenticated: true,
      });
    }
    case LOGOUT: {
      window.localStorage.removeItem('access_token');
      return Object.assign({}, state, {
        isAuthenticated: false,
      });
    }
    default:
      return state;
  }
};
