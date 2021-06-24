import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { Form } from '../../atoms/Form';
import { Container } from '../../atoms/Container';

const LoginPage: React.VFC = () => {
  return (
    <Container>
      <Typography component="h1" variant="h1">
        SIGN IN
      </Typography>
      <Form>
        <TextField label="Email" placeholder="Enter your email" />
        <TextField label="Password" placeholder="Enter your password" />
        <FormControl>
          <Button variant="contained" color="primary" size="large" fullWidth>
            SIGN IN
          </Button>
        </FormControl>
      </Form>
    </Container>
  );
};

export default LoginPage;
