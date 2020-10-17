import { makeStyles } from '@material-ui/core';

export const useMessageStyles = makeStyles((theme) => ({
  message: {
    padding: '10px',
    borderRadius: '15px',
  },
  date: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: '12px',
    color: '#777',
  },
  messageGroup: {
    margin: '10px',
    '&.message': {
      margin: '1px',
      overflow: 'hidden',
    },
    '&.fromCurrent:not(:nth-child(2))': {
      '&.message': {
        borderTopRightRadius: '0px',
      },
    },
    '&.fromCurrent:not(:last-child)': {
      '&.message': {
        borderBottomRightRadius: '0px',
      },
    },
    '&.fromOther:not(:nth-child(2))': {
      '&.message': {
        borderTopLeftRadius: '0px',
      },
    },
    '&.fromOther:not(:last-child)': {
      '&.message': {
        borderBottomLeftRadius: '0px',
      },
    },
  },
  fromOther: {
    width: '100%',
    '&.container': {
      display: 'flex',
    },
    '&.message': {
      maxWidth: '70%',
      background: '#eee',
    },
    '&.message-enter': {
      transform: 'scale(0)',
      transformOrigin: 'left 0%',
    },
    '&.message-enter.message-enter-active': {
      transform: 'scale(1)',
      transition: 'all 0.3s ease',
    },
  },
  fromCurrent: {
    width: '100%',
    '&.container': {
      display: 'flex',
      flexDirection: 'row-reverse',
    },
    '&.message': {
      maxWidth: '70%',
      background: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
    },
    '&.message-enter': {
      transform: 'scale(0)',
      transformOrigin: 'right 0%',
    },
    '&.message-enter.message-enter-active': {
      transform: 'scale(1)',
      transition: 'all 0.3s ease',
    },
  },
  messageLink: {
    position: 'relative',
  },
  messageLinkRemove: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    color: 'white',
  },
}));
