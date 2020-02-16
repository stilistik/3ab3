import React from 'react';
import { Icon } from '../icon';
import styles from './Error.css';

const Error = ({ type, message, size }) => {
  let cls;
  switch (type) {
    case 'absolute':
      cls = styles.absolute;
      break;
    default:
      cls = styles.relative;
      break;
  }

  return (
    <div className={cls}>
      {size === 'large' ? (
        <div className={styles.container}>
          <h3 className={styles.header}>
            <Icon type="error" style={{ marginRight: '8px' }} />
            Error
          </h3>
          <span>{message}</span>
        </div>
      ) : null}
      {size === 'small' ? (
        <div className={styles.header}>
          <Icon type="error" style={{ marginRight: '8px' }} />
          <span>{message}</span>
        </div>
      ) : null}
    </div>
  );
};

Error.defaultProps = {
  size: 'large',
  type: 'relative',
  message: 'An unknown error happened.',
};

export default Error;
