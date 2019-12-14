import React from 'react';
import uuid from 'uuid/v4';

import styles from './ScrollContext.less';

const ScrollContext = React.createContext(null);

export function withScrollListener(WrappedComponent) {
  return class ScrollListener extends React.Component {
    constructor(props) {
      super(props);
      this.id = uuid();
    }

    componentDidMount = () => {
      if (!this.component.onScroll)
        throw new Error(
          'Error in withScroll: WrappedComponent must implement method onScroll()'
        );
      this.scrollContext.registerScrollListener(this, this.id);
    };

    componentWillUnmount = () => {
      this.scrollContext.unregisterScrollListener(this, this.id);
    };

    onScroll = () => this.component.onScroll();

    render() {
      return (
        <ScrollContext.Consumer>
          {(value) => {
            this.scrollContext = value;
            return (
              <WrappedComponent
                ref={(ref) => (this.component = ref)}
                {...this.props}
              />
            );
          }}
        </ScrollContext.Consumer>
      );
    }
  };
}

export function withScrollEmitter(WrappedComponent) {
  return class ScrollEmitter extends React.Component {
    constructor(props) {
      super(props);
      this.id = uuid();
    }

    componentDidMount = () => {
      this.scrollContext.registerScrollEmitter(this, this.id);
    };

    componentWillUnmount = () => {
      this.scrollContext.unregisterScrollEmitter(this, this.id);
    };

    onScroll = () => this.scrollContext.onScroll();

    render() {
      return (
        <ScrollContext.Consumer>
          {(value) => {
            this.scrollContext = value;
            return (
              <WrappedComponent onScroll={this.onScroll} {...this.props} />
            );
          }}
        </ScrollContext.Consumer>
      );
    }
  };
}

export class ScrollProvider extends React.Component {
  constructor(props) {
    super(props);
    this.listeners = {};
  }

  componentDidMount = () => {
    this.container.addEventListener('scroll', this.scroll, true);
  };

  componentWillUnmount = () => {
    this.container.removeEventListener('scroll', this.scroll, true);
  };

  scroll = async () => {
    const height = this.container.scrollHeight - this.container.offsetHeight;
    const thresh = (height / 100) * 80; // load more at 80% height scrolled;
    if (this.container.scrollTop >= thresh) this.notifyListeners();
  };

  notifyListeners = () => {
    for (let listener of Object.values(this.listeners)) {
      listener.onScroll();
    }
  };

  registerScrollListener = (ref, id) => {
    if (!this.listeners[id]) this.listeners[id] = ref;
  };

  unregisterScrollListener = (ref, id) => {
    if (this.listeners[id]) delete this.listeners[id];
  };

  render() {
    return (
      <div className={styles.pagination} ref={(ref) => (this.container = ref)}>
        <ScrollContext.Provider value={this}>
          {this.props.children}
        </ScrollContext.Provider>
      </div>
    );
  }
}

export default ScrollProvider;
