import Container, { type ContainerProps } from '@mui/material/Container';

export default function ContentContainer(props: ContainerProps) {
  return <Container sx={{ py: 2 }} {...props} />;
}
