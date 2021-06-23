import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';

export const TimeRangeSelect: React.FC<TextFieldProps> = (props) => {
  return (
    <TextField select {...props}>
      <MenuItem value="this-month">This month</MenuItem>
      <MenuItem value="last-month">Last month</MenuItem>
      <MenuItem value="this-year">This year</MenuItem>
      <MenuItem value="custom">Custom</MenuItem>
    </TextField>
  );
};
