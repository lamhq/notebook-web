import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MButton, { ButtonProps as MButtonProps } from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    fontSize: '1.0625rem',
    fontWeight: 'bold',
    padding: '0.8125rem 1rem',
  },
});

export type ButtonProps = MButtonProps;

export const Button: React.FC<ButtonProps> = (props) => {
  const classes = useStyles();
  return <MButton {...props} classes={{ root: classes.root }} />;
};
