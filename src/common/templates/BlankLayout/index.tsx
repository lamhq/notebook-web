import React from 'react';
import Typography from '@mui/material/Typography';
import ContentContainer from '../../atoms/ContentContainer';

export interface BlankLayoutProps {
  title: string;
}

const BlankLayout: React.FC<BlankLayoutProps> = ({ title, children }) => {
  return (
    <>
      <ContentContainer>
        <Typography component="h1" variant="h2">
          {title}
        </Typography>
        {children}
      </ContentContainer>
    </>
  );
};

export default BlankLayout;
