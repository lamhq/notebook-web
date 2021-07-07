import React from 'react';
import {
  DatePicker as MuiDatePicker,
  DateTimePicker as MuiDateTimePicker,
  DatePickerProps,
  DateTimePickerProps,
} from '@material-ui/pickers';

export const DatePicker = React.forwardRef<unknown, DatePickerProps>(function DatePicker(
  props,
  ref,
) {
  return <MuiDatePicker format="dd/MM/yyyy" {...props} inputRef={ref} />;
});

export const DateTimePicker = React.forwardRef<unknown, DateTimePickerProps>(
  function DateTimePicker(props, ref) {
    return <MuiDateTimePicker format="EEE, d LLL, yyyy h:mm aaa" {...props} inputRef={ref} />;
  },
);
