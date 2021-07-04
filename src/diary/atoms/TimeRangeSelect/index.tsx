import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import { TimeRange } from '../../types';

export const TimeRangeSelect = React.forwardRef<unknown, TextFieldProps>(
  function TimeRangeSelectRef(props, ref) {
    return (
      <TextField select {...props} inputRef={ref}>
        <MenuItem value={TimeRange.ThisWeek}>This week</MenuItem>
        <MenuItem value={TimeRange.ThisMonth}>This month</MenuItem>
        <MenuItem value={TimeRange.ThisYear}>This year</MenuItem>
        <MenuItem value={TimeRange.LastMonth}>Last month</MenuItem>
        <MenuItem value={TimeRange.Custom}>Custom</MenuItem>
      </TextField>
    );
  },
);
