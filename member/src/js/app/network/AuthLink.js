import { ApolloLink, Observable } from 'apollo-link';

const getToken = () => {
  return window.localStorage.getItem('access_token');
};

export class AuthLink extends ApolloLink {
  injectClient = (client) => {
    this.client = client;
  };

  setTokenHeader = (operation) => {
    const token = getToken();
    if (token) {
      operation.setContext({ headers: { Authorization: `Bearer ${token}` } });
    } else {
      throw new Error('Apollo AuthLink Error: No access token found');
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
          error: (err) => observer.error(err),
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
