import React from 'react';

import styles from './ScrollContainer.less';

export const ScrollContainer = ({ children, getApi, ...rest }) => {
  const ref = React.useRef(null);

  React.useEffect(() => {
    ref.current.addEventListener('scroll', onScroll);
    getApi({ scrollTo, scrollToBottom, scrollToTop }); // pass api to parent
    return () => ref.current.removeEventListener('scroll', onScroll);
  }, []);

  const onScroll = () => {
    const element = ref.current;
    if (!element) return null;

    const { scrollTop, scrollHeight, clientHeight } = element;
    const height = scrollHeight - clientHeight;
    rest.onScroll(element, scrollTop, height);
  };

  const scrollTo = (value) => {
    ref.current.scrollTop = value;
  };

  const scrollToBottom = () => {
    ref.current.scrollTop = ref.current.scrollHeight;
  };

  const scrollToTop = () => {
    ref.current.scrollTop = 0;
  };

  return (
    <div className={styles.container} ref={ref}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

ScrollContainer.defaultProps = {
  onScroll: () => {},
};
