import React from 'react';
import { SnackbarContent, IconButton } from '@material-ui/core';
import { Icon } from '../icon';
import classnames from 'classnames';

import styles from './Message.less';

const variantIcon = {
  success: 'checkCircle',
  warning: 'warning',
  error: 'error',
  info: 'info',
};

export const Message = (props) => {
  const { className, message, onClose, variant, ...other } = props;
  return (
    <SnackbarContent
      style={{ backgroundColor: 'red' }}
      className={classnames(styles[variant], className)}
      message={
        <span className={styles.message}>
          <Icon type={variantIcon[variant]} style={{ marginRight: 5 }} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={onClose}
        >
          <Icon type="close" />
        </IconButton>,
      ]}
      {...other}
    />
  );
};

export default Message;
