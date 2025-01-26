import {
  MobileDatePicker,
  type MobileDatePickerProps as MuiDatePickerProps,
} from '@mui/x-date-pickers/MobileDatePicker';

type InputFieldProps = {
  error?: boolean;
  helperText?: string;
};

export type DatePickerProps = Omit<MuiDatePickerProps<Date>, 'renderInput'> &
  InputFieldProps;

export default function DatePicker({ error, helperText, ...rest }: DatePickerProps) {
  return (
    <MobileDatePicker
      format="dd/MM/yyyy"
      slotProps={{ textField: { error, helperText } }}
      {...rest}
    />
  );
}
