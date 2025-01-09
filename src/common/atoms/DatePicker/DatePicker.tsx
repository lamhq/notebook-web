import MobileDatePicker, {
  type MobileDatePickerProps as MuiDatePickerProps,
} from '@mui/lab/MobileDatePicker';
import TextField from '@mui/material/TextField';
import { forwardRef } from 'react';

interface InputFieldProps {
  error?: boolean;
  helperText?: string;
}

export type DatePickerProps = Omit<MuiDatePickerProps<Date>, 'renderInput'> &
  InputFieldProps;

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  function DatePicker({ error, helperText, ...props }, ref) {
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
  },
);

export default DatePicker;
