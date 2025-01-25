import {
  MobileDatePicker,
  type MobileDatePickerProps as MuiDatePickerProps,
} from '@mui/x-date-pickers/MobileDatePicker';
import { forwardRef } from 'react';

type InputFieldProps = {
  error?: boolean;
  helperText?: string;
}

export type DatePickerProps = Omit<MuiDatePickerProps<Date>, 'renderInput'> &
  InputFieldProps;

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(function DatePicker(
  { error, helperText, ...props },
  ref,
) {
  return (
    <MobileDatePicker
      format="dd/MM/yyyy"
      inputRef={ref}
      slotProps={{ textField: { error, helperText } }}
      {...props}
    />
  );
});

export default DatePicker;
