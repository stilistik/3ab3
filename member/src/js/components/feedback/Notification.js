import React from 'react';
import { SnackbarContent, IconButton } from '@material-ui/core';
import { Icon } from '../icon';
import classnames from 'classnames';

import styles from './Notification.less';

const variantIcon = {
  success: 'checkCircle',
  warning: 'warning',
  error: 'error',
  info: 'info',
};

const Notification = (props) => {
  const { className, title, text, onClose, variant, ...other } = props;
  return (
    <SnackbarContent
      className={classnames(styles.notification, className)}
      message={
        <div>
          <div className={styles.header}>
            <div className={styles.title}>
              <Icon
                type={variantIcon[variant]}
                className={styles[variant]}
                style={{ marginRight: 5 }}
              />
              {title}
            </div>
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              onClick={onClose}
              style={{ marginLeft: 5 }}
            >
              <Icon type="close" />
            </IconButton>
          </div>
          <div className={styles.body}>
            <span>{text}</span>
          </div>
        </div>
      }
      {...other}
    />
  );
};

export default Notification;
