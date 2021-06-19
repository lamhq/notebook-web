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
});
