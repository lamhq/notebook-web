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
    fontFamily:
      '"Nunito Sans",-apple-system,BlinkMacSystemFont,Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  },
});
