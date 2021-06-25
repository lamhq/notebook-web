import React from 'react';
import Box, { BoxProps } from '@material-ui/core/Box';
import { useTheme } from '@material-ui/core/styles';

/**
 * Buttons container
 */
export const Actions: React.FC<BoxProps> = (props: BoxProps) => {
  const theme = useTheme();
  return <Box display="flex" justifyContent="center" gridColumnGap={theme.spacing(2)} {...props} />;
};
