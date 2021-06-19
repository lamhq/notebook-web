import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiTextField, { TextFieldProps } from '@material-ui/core/TextField';

export const TextField = withStyles({
  root: {
    '& .MuiFormLabel-root': {
      fontSize: '1.0625rem',
    },
    '& .MuiInputBase-input': {
      fontSize: '1.25rem',
      '&::placeholder': {
        fontSize: '1.25rem',
      },
    },
    '& .MuiInput-underline': {
      '&:before': {
        borderColor: '#BFBFBF',
      },
      '&:after': {
        borderColor: '#BFBFBF',
      },
    },
  },
})((props: TextFieldProps) => (
  <MuiTextField
    fullWidth
    InputLabelProps={{
      shrink: true,
    }}
    {...props}
  />
));
