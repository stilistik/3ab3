import React from 'react';

import styles from './Logo.less';

export const Logo = (props) => {
  return (
    <div className={styles.logo} {...props}>
      <h1>3A</h1>
      <h1>B3</h1>
    </div>
  );
};
