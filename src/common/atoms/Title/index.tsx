import clsx from 'clsx';
import React from 'react';
import styles from './index.module.css';

export interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * Heading level: h1, h2, ...
   */
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  className?: string;
}

export const Title: React.FC<TitleProps> = (props) => {
  const { level = 'h1', className, children, ...rest } = props;
  const Heading = level;

  return (
    <Heading className={clsx(className, styles.title, styles[level])} {...rest}>
      {children}
    </Heading>
  );
};
