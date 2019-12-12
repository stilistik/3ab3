import { ApolloLink, Observable } from 'apollo-link';

const refreshToken = () => {
  return new Promise((resolve) => {
    const auth_details = new Buffer(
      'ce0229b8-7ba7-42eb-9739-6c9e1ce01fb9:uaj0v3xz'
    ).toString('base64');
    const payload = {
      refresh_token: window.localStorage.getItem('refresh_token'),
      grant_type: 'refresh_token',
    };
    fetch(global.API_URL + '/oauth/token/', {
      headers: {
        Authorization: 'Basic ' + auth_details,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response || !response.ok) {
          resolve(false);
        }
        response
          .json()
          .then((json) => {
            window.sessionStorage.setItem('access_token', json.access_token);
            resolve(true);
          })
          .catch(() => {
            resolve(false);
          });
      })
      .catch(() => {
        resolve(false);
      });
  });
};

const getToken = () => {
  return window.localStorage.getItem('access_token');
};

export class AuthLink extends ApolloLink {
  injectClient = (client) => {
    this.client = client;
  };

  refreshToken = () => {
    if (!this.tokenRefreshingPromise)
      this.tokenRefreshingPromise = refreshToken(this.client);
    return this.tokenRefreshingPromise;
  };

  setTokenHeader = (operation) => {
    const token = getToken();
    if (token)
      operation.setContext({ headers: { authorization: `Bearer ${token}` } });
    else {
      this.refreshToken().then((success) => {
        if (success)
          operation.setContext({
            headers: { authorization: `Bearer ${token}` },
          });
      });
    }
  };

  request(operation, forward) {
    // set token in header
    this.setTokenHeader(operation);
    // try refreshing token once if it has expired
    return new Observable((observer) => {
      let subscription, innerSubscription;
      try {
        subscription = forward(operation).subscribe({
          next: observer.next.bind(observer),
          complete: observer.complete.bind(observer),
          error: (err) => {
            if (err.statusCode === 401) {
              this.refreshToken().then((success) => {
                if (success) {
                  // set new token and retry operation
                  this.setTokenHeader(operation);
                  innerSubscription = forward(operation).subscribe(observer);
                } else {
                  // throw error
                  observer.error(new Error('Failed to refresh access token.'));
                }
              });
            } else {
              observer.error(err);
            }
          },
        });
      } catch (e) {
        observer.error(e);
      }
      return () => {
        if (subscription) subscription.unsubscribe();
        if (innerSubscription) innerSubscription.unsubscribe();
        if (this.tokenRefreshingPromise) this.tokenRefreshingPromise = null;
      };
    });
  }
}