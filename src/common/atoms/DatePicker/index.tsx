import React from 'react';
import TextField from '@mui/material/TextField';
import MobileDatePicker, { MobileDatePickerProps as MuiDatePickerProps } from '@mui/lab/MobileDatePicker';
import MobileDateTimePicker, { MobileDateTimePickerProps as MuiDateTimePickerProps } from '@mui/lab/MobileDateTimePicker';

export type DatePickerProps = Omit<MuiDatePickerProps, 'renderInput'>;

export const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
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
      <MobileDateTimePicker
        inputFormat="EEE, d LLL, yyyy h:mm aaa"
        inputRef={ref}
        renderInput={(inputProps) => <TextField {...inputProps} />}
        {...props}
      />
    );
  },
);
