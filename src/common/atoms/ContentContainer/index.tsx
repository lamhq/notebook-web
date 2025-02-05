import Container, { type ContainerProps } from '@mui/material/Container';

/**
 * Content container
 * Add vertical padding to the content
 */
export default function ContentContainer(props: ContainerProps) {
  return <Container sx={{ py: 2 }} {...props} />;
}
