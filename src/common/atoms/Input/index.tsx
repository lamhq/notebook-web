import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MuiTextField, { TextFieldProps } from '@material-ui/core/TextField';

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

export const TextField: React.VFC<TextFieldProps> = (props) => {
  const classes = useStyles();
  return (
    <MuiTextField
      fullWidth
      InputLabelProps={{
        shrink: true,
        classes: {
          root: classes.label,
        },
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
