import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { Icon } from '../icon';

import styles from './Loading.less';

export const Loading = ({ type, size, color, style }) => {
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
        <CircularProgress disableShrink style={{ ...style, color: color }} />
      ) : null}
      {size === 'small' ? (
        <Icon type="loading" style={{ ...style, color: color }} />
      ) : null}
    </div>
  );
};

Loading.defaultProps = {
  type: 'relative',
  size: 'large',
};
