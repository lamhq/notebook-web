import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  DatePicker as MuiDatePicker,
  DateTimePicker as MuiDateTimePicker,
  DatePickerProps,
  DateTimePickerProps,
} from '@material-ui/pickers';

const useStyles = makeStyles({
  root: {
    marginBottom: '1.4375rem',
    '& .MuiInput-underline': {
      '&:before': {
        borderColor: '#BFBFBF',
      },
      '&:after': {
        borderColor: '#BFBFBF',
      },
    },
  },
});

export const DatePicker: React.VFC<DatePickerProps> = (props) => {
  const classes = useStyles();
  return <MuiDatePicker format="dd/MM/yyyy" className={classes.root} fullWidth {...props} />;
};

export const DateTimePicker: React.VFC<DateTimePickerProps> = (props) => {
  const classes = useStyles();
  return (
    <MuiDateTimePicker
      format="EEE, d LLL, yyyy h:mm aaa"
      className={classes.root}
      fullWidth
      {...props}
    />
  );
};
