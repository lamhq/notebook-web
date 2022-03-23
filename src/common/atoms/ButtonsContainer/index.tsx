import React from 'react';
import Box, { BoxProps } from '@mui/material/Box';

/**
 * Buttons container
 */
const ButtonsContainer: React.FC<BoxProps> = (props) => (
  <Box display="flex" justifyContent="center" columnGap={2} {...props} />
);

export default ButtonsContainer;
