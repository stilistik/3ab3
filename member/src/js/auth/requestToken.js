export const requestToken = async (email, password, messageHandler) => {
  const auth_details = new Buffer(
    'Ng37FZ3ZtZ5MvaKJsJdbqWKdP87IMPDtpa/izWqtB5BDZZ8myPzsPAWpO0bEaPMV:JNtTf4T+lag='
  ).toString('base64');
  const payload = {
    username: email,
    password: password,
    grant_type: 'password',
  };
  let response = await fetch(global.API_URL + '/oauth/token/', {
    headers: {
      Authorization: 'Basic ' + auth_details,
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(payload),
  }).catch(async () => {
    // catch unknown authentication errors
    messageHandler(
      'error',
      'Unable to fetch from login server. Maybe the server is offline...'
    );
    return null;
  });
  if (!response.ok) {
    // wrong login credentials
    if (response.status === 502) {
      this.props.app.handleMessages('error', 'Login server gateway error.');
      return null;
    } else if (response.status === 403) {
      messageHandler('error', 'Failed to login with your credentials.');
      return null;
    } else {
      messageHandler('error', 'Unknown error while logging in.');
      return null;
    }
  } else {
    const json = await response.json();
    return json;
  }
};
