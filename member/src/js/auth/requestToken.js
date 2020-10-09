import { Message } from 'Components';

export const requestToken = async (emailToken) => {
  try {
    const payload = {
      token: emailToken,
    };
    const response = await fetch(global.API_URL + '/auth/passwordless/login', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(payload),
    });
    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    // catch unknown authentication errors
    Message.error(error);
    return null;
  }
};
