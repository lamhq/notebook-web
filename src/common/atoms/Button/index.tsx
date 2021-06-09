import React from 'react';
import { Button as MButton, ButtonProps as MButtonProps } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
