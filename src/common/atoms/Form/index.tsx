import clsx from 'clsx';
import React from 'react';
import styles from './index.module.css';

export type FormProps = React.HTMLAttributes<HTMLFormElement>;

export const Form: React.FC<FormProps> = (props) => {
  const { className, children, ...rest } = props;

  return (
    <form className={clsx(className, styles.form)} {...rest}>
      {children}
    </form>
  );
};
