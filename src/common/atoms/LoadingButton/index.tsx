import React from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

export interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
  loadingIndicator?: React.ReactNode;
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading = false,
  loadingIndicator,
  ...rest
}) => {
  const indicator = loadingIndicator || <CircularProgress color="inherit" size={16} />;
  const btnProps = {
    startIcon: loading ? indicator : undefined,
    disabled: loading,
    ...rest,
  };
  return <Button {...btnProps} />;
};
