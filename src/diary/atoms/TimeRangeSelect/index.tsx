import React from 'react';
import Select, { SelectProps } from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

export const TimeRangeSelect: React.FC<SelectProps> = (props) => {
  return (
    <FormControl>
      <InputLabel shrink>Time range</InputLabel>
      <Select {...props}>
        <MenuItem value="this-month">This month</MenuItem>
        <MenuItem value="last-month">Last month</MenuItem>
        <MenuItem value="this-year">This year</MenuItem>
        <MenuItem value="custom">Custom</MenuItem>
      </Select>
    </FormControl>
  );
};
