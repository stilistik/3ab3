import React from 'react';
import classnames from 'classnames';
import styles from './Layout.less';

export const Container = ({ children, className, style }) => {
  const cls = classnames(styles.container, className);
  return (
    <div className={cls} style={style}>
      {children}
    </div>
  );
};

export const Center = ({ children, className, style }) => {
  const cls = classnames(styles.center, className);
  return (
    <div className={cls} style={style}>
      {children}
    </div>
  );
};
