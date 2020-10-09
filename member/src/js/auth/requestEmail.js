import { Message } from 'Components';

export const requestEmail = async (email) => {
  try {
    const auth_details = Buffer.from(
      'Ng37FZ3ZtZ5MvaKJsJdbqWKdP87IMPDtpa/izWqtB5BDZZ8myPzsPAWpO0bEaPMV:JNtTf4T+lag='
    ).toString('base64');
    const payload = {
      email: email,
    };
    const response = await fetch(
      global.API_URL + '/auth/passwordless/request',
      {
        headers: {
          Authorization: 'Basic ' + auth_details,
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
