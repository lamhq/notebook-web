import React from 'react';
import MobileDatePicker, { DatePickerProps as MuiDatePickerProps } from '@mui/lab/DatePicker';
import MuiDateTimePicker, {
  DateTimePickerProps as MuiDateTimePickerProps,
} from '@mui/lab/DateTimePicker';
import TextField from '@mui/material/TextField';

export type DatePickerProps = Omit<MuiDatePickerProps, 'renderInput'>;

export const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  // prettier-ignore
  function DatePicker(props, ref) {
    return (<MobileDatePicker
      inputFormat="dd/MM/yyyy"
      inputRef={ref}
      renderInput={(inputProps) => <TextField {...inputProps} />}
      {...props}
    />);
  },
);

export type DateTimePickerProps = Omit<MuiDateTimePickerProps, 'renderInput'>;

export const DateTimePicker = React.forwardRef<HTMLInputElement, DateTimePickerProps>(
  function DateTimePicker(props, ref) {
    return (
      <MuiDateTimePicker
        inputFormat="EEE, d LLL, yyyy h:mm aaa"
        inputRef={ref}
        {...props}
        renderInput={(inputProps) => <TextField {...inputProps} />}
      />
    );
  },
);
