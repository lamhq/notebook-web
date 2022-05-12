import React from 'react';
import TextField from '@mui/material/TextField';
import MobileDatePicker, {
  MobileDatePickerProps as MuiDatePickerProps,
} from '@mui/lab/MobileDatePicker';
import MobileDateTimePicker, {
  MobileDateTimePickerProps as MuiDateTimePickerProps,
} from '@mui/lab/MobileDateTimePicker';

interface InputFieldProps {
  error?: boolean;
  helperText?: string;
}

export type DatePickerProps = Omit<MuiDatePickerProps, 'renderInput'> & InputFieldProps;

export const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(function DatePicker(
  { error, helperText, ...props },
  ref,
) {
  return (
    <MobileDatePicker
      inputFormat="dd/MM/yyyy"
      inputRef={ref}
      renderInput={(inputProps) => (
        <TextField error={error} helperText={helperText} {...inputProps} />
      )}
      {...props}
    />
  );
});

export type DateTimePickerProps = Omit<MuiDateTimePickerProps, 'renderInput'> & InputFieldProps;

export const DateTimePicker = React.forwardRef<HTMLInputElement, DateTimePickerProps>(
  function DateTimePicker({ error, helperText, ...props }, ref) {
    return (
      <MobileDateTimePicker
        inputFormat="EEE, d LLL, yyyy h:mm aaa"
        inputRef={ref}
        renderInput={(inputProps) => (
          <TextField error={error} helperText={helperText} {...inputProps} />
        )}
        {...props}
      />
    );
  },
);
