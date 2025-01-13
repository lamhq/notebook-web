import Box, { type BoxProps } from '@mui/material/Box';

/**
 * Buttons container
 */
export default function ButtonsContainer(props: BoxProps) {
  return <Box display="flex" justifyContent="center" columnGap={2} {...props} />;
}
