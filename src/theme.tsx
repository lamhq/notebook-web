// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as type from '@material-ui/lab/themeAugmentation';
import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#296BE3',
    },
  },
  shape: {
    borderRadius: 0,
  },
  typography: {
    htmlFontSize: 16,
    fontSize: 16,
    fontFamily: [
      '"Nunito Sans"',
      '-apple-system',
      'BlinkMacSystemFont',
      'Roboto',
      'Oxygen-Sans',
      'Ubuntu',
      'Cantarell',
      '"Helvetica Neue"',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '1.875rem',
      fontWeight: 'bold',
    },
    h2: {
      fontSize: '1.8rem',
    },
    h3: {
      fontSize: '1.75rem',
    },
    h4: {
      fontSize: '1.0625rem',
      fontWeight: 'bold',
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.75rem',
    },
  },
  overrides: {
    MuiFormControl: {
      root: {
        marginBottom: '1.4375rem',
      },
    },
    MuiInput: {
      underline: {
        '&::before': {
          borderColor: '#BFBFBF',
        },
        '&::after': {
          borderColor: '#BFBFBF',
        },
      },
    },
    MuiButton: {
      root: {
        padding: '6px 24px',
      },
    },
    MuiIconButton: {
      sizeSmall: {
        padding: 0,
      },
    },
    MuiAutocomplete: {
      tag: {
        height: '25px',
      },
    },
  },
  props: {
    MuiInputLabel: {
      shrink: true,
    },
    MuiTextField: {
      fullWidth: true,
    },
    MuiFormControl: {
      fullWidth: true,
    },
  },
});
