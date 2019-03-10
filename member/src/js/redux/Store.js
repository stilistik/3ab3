import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import rootReducer from 'Redux/reducers';

export let store;
if (process.env.NODE_ENV === 'development') {
  // development
  const logger = createLogger({ collapsed: true });
  store = createStore(rootReducer, applyMiddleware(logger));
} else {
  // production
  store = createStore(rootReducer);
}

export const dispatch = store.dispatch;

class Store extends React.Component {
  render() {
    return <Provider store={store}>{this.props.children}</Provider>;
  }
}

export default Store;
