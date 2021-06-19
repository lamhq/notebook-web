import React from 'react';
import {
  DatePicker as MuiDatePicker,
  DateTimePicker as MuiDateTimePicker,
  DatePickerProps,
  DateTimePickerProps,
} from '@material-ui/pickers';

export const DatePicker: React.VFC<DatePickerProps> = (props) => (
  <MuiDatePicker format="EEE, d LLL, yyyy" fullWidth {...props} />
);
export const DateTimePicker: React.VFC<DateTimePickerProps> = (props) => (
  <MuiDateTimePicker format="EEE, d LLL, yyyy h:mm aaa" fullWidth {...props} />
);
