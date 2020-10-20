import React from 'react';
import { SnackbarContent, IconButton } from '@material-ui/core';
import { Icon } from '../icon';
import { Box } from '../layout';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { MessageFormatter } from './MessageFormatter';

const useStyles = makeStyles((theme) => ({
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  success: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.contrastText,
  },
  error: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.success.contrastText,
  },
  warning: {
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.success.contrastText,
  },
  info: {
    backgroundColor: theme.palette.info.main,
    color: theme.palette.success.contrastText,
  },
}));

const icons = {
  success: 'checkCircle',
  warning: 'warning',
  error: 'error',
  info: 'info',
};

export const Message = (props) => {
  const { className, message, onClose, variant, ...other } = props;
  const classes = useStyles();

  const msg = MessageFormatter.formatMessage(message);
  return (
    <SnackbarContent
      className={classnames(classes[variant], className)}
      message={
        <span className={classes.message}>
          <Box mr={1}>
            <Icon type={icons[variant]} />
          </Box>
          {msg}
        </span>
      }
      action={[
        <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
          <Icon type="close" />
        </IconButton>,
      ]}
      {...other}
    />
  );
};

export default Message;