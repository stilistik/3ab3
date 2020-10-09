import { Message } from 'Components';

export const requestEmail = async (email) => {
  try {
    const payload = {
      email: email,
    };
    const response = await fetch(
      global.API_URL + '/auth/passwordless/request',
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(payload),
      }
    );
    if (response && response.ok) return true;
    else return false;
  } catch (error) {
    // catch unknown authentication errors
    Message.error(error);
    return null;
  }
};
