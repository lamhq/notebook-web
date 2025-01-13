import type { ReactNode } from 'react';
import ContentContainer from '../../atoms/ContentContainer';
import Typography from '../../atoms/Typography/Typography';

export interface BlankLayoutProps {
  title: string;
  children: ReactNode;
}

export default function BlankLayout({ title, children }: BlankLayoutProps) {
  return (
    <ContentContainer>
      <Typography component="h1" variant="h2">
        {title}
      </Typography>
      {children}
    </ContentContainer>
  );
}
