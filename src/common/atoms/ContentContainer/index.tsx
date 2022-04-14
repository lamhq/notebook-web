import React from 'react';
import Container, { ContainerProps } from '@mui/material/Container';

const ContentContainer: React.FC<ContainerProps> = (props) => (
  <Container sx={{ py: 2 }} {...props} />
);

export default ContentContainer;
