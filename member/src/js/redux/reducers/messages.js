import { SHOW_MESSAGE, HIDE_MESSAGE } from '../actions';

const initState = {
  text: '',
  type: '',
  showing: false,
};

export const messages = (state = initState, action) => {
  switch (action.type) {
    case SHOW_MESSAGE:
      return Object.assign({}, state, {
        showing: true,
        text: action.message.text,
        type: action.message.type,
      });
    case HIDE_MESSAGE:
      return Object.assign({}, state, {
        showing: false,
      });
    default:
      return state;
  }
};
