import Button, { type ButtonProps } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import type { ReactNode } from 'react';

export type LoadingButtonProps = {
  loading?: boolean;
  loadingIndicator?: ReactNode;
} & ButtonProps;

export default function LoadingButton({
  loading = false,
  loadingIndicator,
  ...rest
}: LoadingButtonProps) {
  const indicator = loadingIndicator ?? (
    <CircularProgress color="inherit" size={16} />
  );
  const btnProps = {
    startIcon: loading ? indicator : undefined,
    disabled: loading,
    ...rest,
  };
  return <Button {...btnProps} />;
}
