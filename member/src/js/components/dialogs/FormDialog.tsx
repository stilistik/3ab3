import React from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Form, FormSubmit } from 'Components/form';
import { FieldOptions, Serializable } from 'Components/form/types';

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

interface FormDialogProps {
  show: boolean;
  title?: string;
  children?: React.ReactNode;
  handleCancel: () => void;
  handleSubmit: (
    values: NestedRecord<Serializable>,
    options: NestedRecord<FieldOptions>
  ) => void;
  submitText?: string;
  cancelText?: string;
}

export const FormDialog: React.FC<FormDialogProps> = ({
  show,
  title,
  children,
  handleCancel,
  handleSubmit,
  submitText = 'Submit',
  cancelText = 'Cancel',
}) => {
  const classes = useStyles();
  return (
    <Dialog
      open={show}
      onClose={handleCancel}
      onClick={(e) => e.stopPropagation()}
      classes={{
        paper: classes.paper,
      }}
    >
      <Form onSubmit={handleSubmit}>
        <DialogTitle className={classes.title}>{title}</DialogTitle>
        <DialogContent className={classes.content}>{children}</DialogContent>
        <DialogActions>
          <FormSubmit>
            <Button type="submit">{submitText}</Button>
          </FormSubmit>
          <Button onClick={handleCancel}>{cancelText}</Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
};
