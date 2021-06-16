import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MuiButton, { ButtonProps as MuiButtonProps } from '@material-ui/core/Button';
import MuiIconButton, { IconButtonProps as MuiIconButtonProps } from '@material-ui/core/IconButton';

const useStyles = makeStyles({
  root: {
    fontSize: '1.0625rem',
    fontWeight: 'bold',
    padding: '0.8125rem 1rem',
  },
  iconBtn: {
    padding: 0,
  },
});

export type ButtonProps = MuiButtonProps;

export const Button: React.FC<ButtonProps> = (props) => {
  const classes = useStyles();
  return <MuiButton {...props} classes={{ root: classes.root }} />;
};

export type IconButtonProps = MuiIconButtonProps;

export const IconButton: React.FC<IconButtonProps> = (props) => {
  const classes = useStyles();
  return <MuiIconButton {...props} classes={{ root: classes.iconBtn }} />;
};
