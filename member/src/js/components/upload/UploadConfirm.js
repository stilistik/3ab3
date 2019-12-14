import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
} from '@material-ui/core';
import { Icon } from '../icon';

const ConfirmMessage = ({ payload }) => {
  if (!payload) return null;
  const count = payload.upload.length;
  if (payload.workbook) {
    return (
      <p>
        You are about to upload{' '}
        <strong>
          {count} file
          {count > 1 ? 's' : ''}
        </strong>{' '}
        to the workbook <strong>{payload.workbook}</strong>. Please confirm this
        action.
      </p>
    );
  } else {
    return (
      <p>
        You are about to upload{' '}
        <strong>
          {count} file
          {count > 1 ? 's' : ''}
        </strong>{' '}
        to the system. Please confirm this action.
      </p>
    );
  }
};

const ConfirmTitle = () => {
  return (
    <span style={{ display: 'flex', alignItems: 'center' }}>
      <Icon type="help" style={{ marginRight: 5 }} /> Confirm Upload
    </span>
  );
};

const UploadConfirm = (props) => {
  const { visible, handleOk, handleCancel } = props;
  return (
    <Dialog
      title={<ConfirmTitle />}
      open={visible}
      onClose={handleCancel}
      onClick={(e) => e.stopPropagation()}
    >
      <DialogTitle>
        <ConfirmTitle />
      </DialogTitle>
      <DialogContent>
        <ConfirmMessage {...props} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOk} color="primary" variant="contained">
          Upload
        </Button>
        <Button onClick={handleCancel} color="primary" variant="outlined">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadConfirm;
