import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiTextField, { TextFieldProps } from '@material-ui/core/TextField';

export const TextField = withStyles({
  root: {
    marginBottom: '1.4375rem',
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
