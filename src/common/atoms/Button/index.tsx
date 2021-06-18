import { withStyles } from '@material-ui/core/styles';
import MuiButton from '@material-ui/core/Button';
import MuiIconButton from '@material-ui/core/IconButton';

export const Button = withStyles({
  root: {
    fontSize: '1.0625rem',
    fontWeight: 'bold',
    padding: '0.8125rem 1rem',
  },
})(MuiButton);

export const IconButton = withStyles({
  root: {
    padding: 0,
  },
})(MuiIconButton);
