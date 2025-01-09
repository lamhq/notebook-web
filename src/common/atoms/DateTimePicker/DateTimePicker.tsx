import MobileDateTimePicker, {
  type MobileDateTimePickerProps as MuiDateTimePickerProps,
} from '@mui/lab/MobileDateTimePicker';
import TextField from '@mui/material/TextField';
import { forwardRef } from 'react';

interface InputFieldProps {
  error?: boolean;
  helperText?: string;
}

export type DateTimePickerProps = Omit<
  MuiDateTimePickerProps<Date>,
  'renderInput'
> &
  InputFieldProps;

const DateTimePicker = forwardRef<HTMLInputElement, DateTimePickerProps>(
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

export default DateTimePicker;
