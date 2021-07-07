import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ConfirmDialogOptions } from '../types';

const DEFAULT_OPTIONS: ConfirmDialogOptions = {
  title: 'Are you sure?',
  content: null,
  confirmationText: 'Ok',
  cancellationText: 'Cancel',
  dialogProps: {},
  confirmationButtonProps: {},
  cancellationButtonProps: {},
};

export interface ConfirmDialogProps {
  open: boolean;
  onCancel?: () => void;
  onConfirm?: () => void;
  options?: ConfirmDialogOptions;
}

const ConfirmDialog: React.VFC<ConfirmDialogProps> = ({ open, options, onCancel, onConfirm }) => {
  const {
    title,
    content,
    confirmationText,
    cancellationText,
    dialogProps,
    confirmationButtonProps,
    cancellationButtonProps,
  } = { ...DEFAULT_OPTIONS, ...options };

  return (
    <Dialog keepMounted {...dialogProps} open={open} onClose={onCancel}>
      {title && <DialogTitle>{title}</DialogTitle>}
      {content && <DialogContent>{content}</DialogContent>}
      <DialogActions>
        <Button {...cancellationButtonProps} onClick={onCancel}>
          {cancellationText}
        </Button>
        <Button color="primary" {...confirmationButtonProps} onClick={onConfirm}>
          {confirmationText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
