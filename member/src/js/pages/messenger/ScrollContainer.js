import React from 'react';
import ResizeObserver from 'resize-observer-polyfill';

import styles from './ScrollContainer.less';

export const ScrollContainer = ({ children, getApi, ...rest }) => {
  const container = React.useRef(null);
  const content = React.useRef(null);
  const resObs = React.useRef(null);

  React.useEffect(() => {
    container.current.addEventListener('scroll', onScroll);
    resObs.current = new ResizeObserver(onResize);
    resObs.current.observe(content.current);
    getApi({ scrollTo, scrollToBottom, scrollToTop }); // pass api to parent
    return () => {
      container.current.removeEventListener('scroll', onScroll);
      resObs.current.unobserve(content.current);
    };
  }, []);

  const onScroll = () => {
    const element = container.current;
    if (!element) return null;
    const { scrollTop, scrollHeight, clientHeight } = element;
    const height = scrollHeight - clientHeight;
    rest.onScroll(element, scrollTop, height);
  };

  const onResize = () => {
    if (rest.initState.current) scrollToBottom();
  };

  const scrollTo = (value) => {
    container.current.scrollTop = value;
  };

  const scrollToBottom = () => {
    container.current.scrollTop = container.current.scrollHeight;
  };

  const scrollToTop = () => {
    container.current.scrollTop = 0;
  };

  return (
    <div className={styles.container} ref={container}>
      <div className={styles.content} ref={content}>
        {children}
      </div>
    </div>
  );
};

ScrollContainer.defaultProps = {
  onScroll: () => {},
};
