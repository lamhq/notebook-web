import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';

const useStyles = makeStyles({
  label: {
    fontSize: '1.0625rem',
  },
  input: {
    fontSize: '1.25rem',
    '&::placeholder': {
      fontSize: '1.25rem',
    },
  },
  underline: {
    '&:before': {
      borderColor: '#BFBFBF',
    },
    '&:after': {
      borderColor: '#BFBFBF',
    },
  },
});

export type InputProps = TextFieldProps;

export const Input: React.VFC<InputProps> = (props) => {
  const classes = useStyles();
  return (
    <TextField
      fullWidth
      InputLabelProps={{
        shrink: true,
        className: classes.label,
      }}
      InputProps={{
        classes: {
          input: classes.input,
          underline: classes.underline,
        },
      }}
      {...props}
    />
  );
};
