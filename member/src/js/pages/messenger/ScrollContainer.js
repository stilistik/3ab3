import React from 'react';

import styles from './ScrollContainer.less';

export const ScrollContainer = ({ children, request, setRequest, ...rest }) => {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!request) return;
    scrollTo(request);
    setRequest(null);
  }, [request]);

  React.useEffect(() => {
    ref.current.addEventListener('scroll', onScroll);
    scrollTo('bottom');
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
    const element = ref.current;
    if (!element) return;

    let pixelValue;
    if (value === 'bottom') pixelValue = element.scrollHeight;
    else if (value === 'top') pixelValue = 0;
    else pixelValue = value;

    element.scrollTop = pixelValue;
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
