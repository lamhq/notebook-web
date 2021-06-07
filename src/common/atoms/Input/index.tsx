import { TextField, TextFieldProps } from '@material-ui/core';
import React from 'react';

export type InputProps = TextFieldProps;

export const Input: React.VFC<InputProps> = (props) => {
  return (
    <TextField
      fullWidth
      InputLabelProps={{
        shrink: true,
      }}
      {...props}
    />
  );
};
