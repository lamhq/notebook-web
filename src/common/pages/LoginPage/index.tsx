import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { FormGroup } from '../../atoms/FormGroup';
import { Input } from '../../atoms/Input';
import { Title } from '../../atoms/Title';
import { Form } from '../../atoms/Form';
import { Button } from '../../atoms/Button';
import { theme } from '../../../theme';

const LoginPage: React.VFC = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Title>SIGN IN</Title>
        <Form>
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
        </Form>
      </ThemeProvider>
    </>
  );
};

export default LoginPage;
