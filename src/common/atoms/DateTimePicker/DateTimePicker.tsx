import {
  MobileDateTimePicker,
  type MobileDateTimePickerProps as MuiDateTimePickerProps,
} from '@mui/x-date-pickers/MobileDateTimePicker';
import { forwardRef } from 'react';

type InputFieldProps = {
  error?: boolean;
  helperText?: string;
}

export type DateTimePickerProps = Omit<MuiDateTimePickerProps<Date>, 'renderInput'> &
  InputFieldProps;

const DateTimePicker = forwardRef<HTMLInputElement, DateTimePickerProps>(
  function DateTimePicker({ error, helperText, ...props }, ref) {
    return (
      <MobileDateTimePicker
        format="EEE, d LLL, yyyy h:mm aaa"
        inputRef={ref}
        slotProps={{ textField: { error, helperText } }}
        {...props}
      />
    );
  },
);

export default DateTimePicker;
