import React from 'react';
import classnames from 'classnames';

import styles from './Message.less';

export const Message = ({ text, date, fromCurrentUser }) => {
  const cls = classnames(
    { [styles.fromCurrent]: fromCurrentUser },
    { [styles.fromOther]: !fromCurrentUser }
  );

  return (
    <div className={cls}>
      {date && (
        <div className={styles.date}>
          {new Date(date).toLocaleString('de-DE')}
        </div>
      )}
      <div className={styles.container}>
        <div className={styles.message}>
          <span>{text}</span>
        </div>
      </div>
    </div>
  );
};
