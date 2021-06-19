import React from 'react';
import Typography from '@material-ui/core/Typography';
import { FormGroup } from '../../atoms/FormGroup';
import { TextField } from '../../atoms/TextField';
// import { Title } from '../../atoms/Title';
import { Form } from '../../atoms/Form';
import { Button } from '../../atoms/Button';

const LoginPage: React.VFC = () => {
  return (
    <>
      <Typography component="h1" variant="h1">
        SIGN IN
      </Typography>
      <Form>
        <FormGroup>
          <TextField label="Email" placeholder="Enter your email" />
        </FormGroup>
        <FormGroup>
          <TextField label="Password" placeholder="Enter your password" />
        </FormGroup>
        <FormGroup>
          <Button variant="contained" color="primary" fullWidth>
            SIGN IN
          </Button>
        </FormGroup>
      </Form>
    </>
  );
};

export default LoginPage;
