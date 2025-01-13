import MenuItem from '@mui/material/MenuItem';
import TextField, { type TextFieldProps } from '@mui/material/TextField';
import React from 'react';
import { TimeRange } from '../../types';

const TimeRangeSelect = React.forwardRef<unknown, TextFieldProps>(
  function TimeRangeSelectRef(props, ref) {
    const sx = {
      '& .MuiSelect-select': {
        padding: '6px 24px 7px 0',
      },
    };
    return (
      <TextField select sx={sx} {...props} inputRef={ref}>
        <MenuItem value={TimeRange.All}>All</MenuItem>
        <MenuItem value={TimeRange.ThisMonth}>This month</MenuItem>
        <MenuItem value={TimeRange.LastMonth}>Last month</MenuItem>
        <MenuItem value={TimeRange.ThisYear}>This year</MenuItem>
        <MenuItem value={TimeRange.ThisWeek}>This week</MenuItem>
        <MenuItem value={TimeRange.Custom}>Custom</MenuItem>
      </TextField>
    );
  },
);

export default TimeRangeSelect;
