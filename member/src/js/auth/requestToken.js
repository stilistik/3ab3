import { Message } from 'Components';

export const requestToken = async (emailToken) => {
  try {
    const auth_details = Buffer.from(
      'Ng37FZ3ZtZ5MvaKJsJdbqWKdP87IMPDtpa/izWqtB5BDZZ8myPzsPAWpO0bEaPMV:JNtTf4T+lag='
    ).toString('base64');
    const payload = {
      token: emailToken,
    };
    const response = await fetch(global.API_URL + '/auth/passwordless/login', {
      headers: {
        Authorization: 'Basic ' + auth_details,
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
