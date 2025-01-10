import { createTheme } from '@mui/material/styles';
import type {} from '@mui/x-date-pickers/themeAugmentation';

const fontFamily = [
  '"Nunito Sans"',
  '-apple-system',
  'BlinkMacSystemFont',
  'Roboto',
  'Oxygen-Sans',
  'Ubuntu',
  'Cantarell',
  '"Helvetica Neue"',
  'sans-serif',
].join(',');

export const theme = createTheme({
  palette: {
    success: {
      main: 'rgb(76, 175, 80)',
    },
    primary: {
      main: '#296BE3',
    },
    secondary: {
      main: '#e0e0e0',
    },
  },
  shape: {
    borderRadius: 0,
  },
  typography: {
    fontFamily,
    // htmlFontSize: 16,
    // fontSize: 16,
    // h1: {
    //   fontSize: '1.3125rem',
    //   fontWeight: 'bold',
    // },
    // h2: {
    //   fontSize: '1.375rem',
    //   marginBottom: '1.5625rem',
    //   fontWeight: 'bold',
    // },
    // h3: {
    //   fontSize: '1.25rem',
    // },
    // h4: {
    //   fontSize: '1.0625rem',
    //   fontWeight: 'bold',
    // },
    // body1: {
    //   fontSize: '1rem',
    // },
    // body2: {
    //   fontSize: '0.75rem',
    // },
  },
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {
          marginBottom: '1.4375rem',
        },
      },
      defaultProps: {
        fullWidth: true,
      },
    },
    MuiInput: {
      styleOverrides: {
        underline: {
          '&::before': {
            borderColor: '#BFBFBF',
          },
          '&::after': {
            borderColor: '#BFBFBF',
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
        variant: 'standard',
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        tag: {
          height: '25px',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        sizeSmall: {
          padding: 0,
        },
      },
    },
    MuiInputLabel: {
      defaultProps: {
        shrink: true,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '6px 24px',
        },
      },
    },
    MuiDateTimePickerToolbar: {
      styleOverrides: {
        ampmLabel: {
          color: 'lightgray',
          '&.Mui-selected': {
            color: 'rgba(0, 0, 0, 0.6)',
          },
        },
      },
    },
  },
});
