export const SHOW_MESSAGE = 'SHOW_MESSAGE';
export const HIDE_MESSAGE = 'HIDE_MESSAGE';

export const showMessage = (message) => {
  return { type: SHOW_MESSAGE, message };
};

export const hideMessage = () => {
  return { type: HIDE_MESSAGE };
};
