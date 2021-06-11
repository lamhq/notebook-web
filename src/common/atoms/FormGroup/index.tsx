import clsx from 'clsx';
import React from 'react';
import styles from './index.module.css';

export type FormGroupProps = React.HTMLAttributes<HTMLDivElement>;

export const FormGroup: React.FC<FormGroupProps> = (props) => {
  const { className, children, ...rest } = props;

  return (
    <div className={clsx(className, styles.formGroup)} {...rest}>
      {children}
    </div>
  );
};
