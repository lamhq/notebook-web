import { withStyles } from '@material-ui/core/styles';
import MuiFormControl from '@material-ui/core/FormControl';

export const FormControl = withStyles({
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
})(MuiFormControl);
