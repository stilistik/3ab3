import React from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    overflow: 'visible',
  },
  title: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  content: {
    minWidth: '600px',
    overflow: 'visible',
  },
}));

interface ConfirmationDialogProps {
  show: boolean;
  title?: string;
  children?: React.ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
  confirmText?: string;
  confirmColor?: 'inherit' | 'primary' | 'secondary';
  cancelText?: string;
  cancelColor?: 'inherit' | 'primary' | 'secondary';
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  show,
  title,
  children,
  onCancel,
  onConfirm,
  confirmText = 'Confirm',
  confirmColor = 'primary',
  cancelText = 'Cancel',
  cancelColor = 'inherit',
}) => {
  const classes = useStyles();
  return (
    <Dialog
      open={show}
      onClose={onCancel}
      onClick={(e) => e.stopPropagation()}
      classes={{
        paper: classes.paper,
      }}
    >
      <DialogTitle className={classes.title}>{title}</DialogTitle>
      <DialogContent className={classes.content}>{children}</DialogContent>
      <DialogActions>
        <Button data-testid="cancel" onClick={onCancel} color={cancelColor}>
          {cancelText}
        </Button>
        <Button
          data-testid="confirm"
          onClick={onConfirm}
          variant="contained"
          color={confirmColor}
          autoFocus
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
