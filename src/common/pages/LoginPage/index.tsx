import React from 'react';
import Typography from '@material-ui/core/Typography';
import { TextField } from '../../atoms/TextField';
import { Form } from '../../atoms/Form';
import { Button } from '../../atoms/Button';
import { FormControl } from '../../atoms/FormControl';

const LoginPage: React.VFC = () => {
  return (
    <>
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
    </>
  );
};

export default LoginPage;
