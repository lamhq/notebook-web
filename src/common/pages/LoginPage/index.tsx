import React from 'react';
import { Button } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { FormGroup } from '../../atoms/FormGroup';
import { Input } from '../../atoms/Input';
import { Title } from '../../atoms/Title';

const theme = createMuiTheme({
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

const LoginPage: React.VFC = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Title>SIGN IN</Title>
        <FormGroup>
          <Input label="Email" placeholder="Enter your email" />
        </FormGroup>
        <FormGroup>
          <Input label="Password" placeholder="Enter your password" />
        </FormGroup>
        <FormGroup>
          <Button variant="contained" color="primary" fullWidth>
            SIGN IN
          </Button>
        </FormGroup>
      </ThemeProvider>
    </>
  );
};

export default LoginPage;
