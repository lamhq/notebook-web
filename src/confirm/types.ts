import { DialogProps } from '@material-ui/core/Dialog';
import { ButtonProps } from '@material-ui/core/Button';

export interface ConfirmFn {
  (options?: ConfirmDialogOptions): Promise<boolean>;
}

export interface ConfirmDialogOptions {
  title?: React.ReactNode;
  content?: React.ReactNode;
  confirmationText?: React.ReactNode;
  cancellationText?: React.ReactNode;
  dialogProps?: Omit<DialogProps, 'open'>;
  confirmationButtonProps?: ButtonProps;
  cancellationButtonProps?: ButtonProps;
}
