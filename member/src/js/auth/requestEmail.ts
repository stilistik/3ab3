import { Message } from 'Components/index';
import { getBackendUrl } from 'App/network/Utils';

export const requestEmail = async (email: string) => {
  try {
    const auth_details = Buffer.from(
      'Ng37FZ3ZtZ5MvaKJsJdbqWKdP87IMPDtpa/izWqtB5BDZZ8myPzsPAWpO0bEaPMV:JNtTf4T+lag='
    ).toString('base64');
    const payload = {
      email: email,
    };
    await fetch(
      getBackendUrl() + '/auth/request',
      {
        headers: {
          Authorization: 'Basic ' + auth_details,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(payload),
      }
    );
    return true;
  } catch (error) {
    // catch unknown authentication errors
    Message.error(error.message);
    return null;
  }
};
