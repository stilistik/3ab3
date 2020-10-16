import React from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Form, FormProps, FormSubmit } from 'Components/form';
import { FieldOptions, Serializable } from 'Components/form/types';
import { useTranslation } from 'react-i18next';

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
  title: string;
  initValues?: FormProps['initValues'];
  initOpts?: FormProps['initOpts'];
  children?: React.ReactNode;
  onCancel: () => void;
  onSubmit: (
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
  onCancel,
  onSubmit,
  submitText = 'Submit',
  cancelText = 'Cancel',
  initOpts,
  initValues,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <Dialog
      open={show}
      onClose={onCancel}
      onClick={(e) => e.stopPropagation()}
      classes={{
        paper: classes.paper,
      }}
    >
      <Form onSubmit={onSubmit} initOpts={initOpts} initValues={initValues}>
        <DialogTitle className={classes.title}>{title}</DialogTitle>
        <DialogContent className={classes.content}>{children}</DialogContent>
        <DialogActions>
          <Button onClick={onCancel}>{t(cancelText)}</Button>
          <FormSubmit>
            <Button variant="contained" color="primary" type="submit">
              {t(submitText)}
            </Button>
          </FormSubmit>
        </DialogActions>
      </Form>
    </Dialog>
  );
};
