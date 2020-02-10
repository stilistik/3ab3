import React from 'react';
import { Snackbar } from '@material-ui/core';
import NotificationComponent from './Notification';
import MessageComponent from './Message';

const HIDE_DELAY = 6000;

export let Message = {
  error: () => {},
  warning: () => {},
  success: () => {},
  info: () => {},
};

export let Notification = {
  error: () => {},
  warning: () => {},
  success: () => {},
  info: () => {},
};

export const Notifier = () => {
  const [message, setMessage] = React.useState(null);
  const [notification, setNotification] = React.useState(null);

  React.useEffect(() => {
    Message.success = (msg) => {
      setMessage({ variant: 'success', message: msg });
    };

    Message.error = (msg) => {
      setMessage({ variant: 'error', message: msg });
    };

    Message.warning = (msg) => {
      setMessage({ variant: 'warning', message: msg });
    };

    Message.info = (msg) => {
      setMessage({ variant: 'info', message: msg });
    };

    Notification.success = (title, text) => {
      setNotification({ variant: 'success', title: title, text: text });
    };

    Notification.error = (title, text) => {
      setNotification({ variant: 'error', title: title, text: text });
    };

    Notification.warning = (title, text) => {
      setNotification({ variant: 'warning', title: title, text: text });
    };

    Notification.info = (title, text) => {
      setNotification({ variant: 'info', title: title, text: text });
    };
  });

  const handleMessageClose = () => setMessage(null);
  const handleNotificationClose = () => setNotification(null);

  return (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={Boolean(message)}
        autoHideDuration={HIDE_DELAY}
        onClose={handleMessageClose}
      >
        {message ? (
          <MessageComponent
            onClose={handleMessageClose}
            variant={message.variant}
            message={message.message}
          />
        ) : null}
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={Boolean(notification)}
        autoHideDuration={HIDE_DELAY}
        onClose={handleNotificationClose}
      >
        {notification ? (
          <NotificationComponent
            onClose={handleNotificationClose}
            variant={notification.variant}
            title={notification.title}
            text={notification.text}
          />
        ) : null}
      </Snackbar>
    </React.Fragment>
  );
};
