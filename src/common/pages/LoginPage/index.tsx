import React from 'react';
import Typography from '@material-ui/core/Typography';
import { SubmitHandler } from 'react-hook-form';
import { Container } from '../../atoms/Container';
import { LoginFormModel } from '../../types';
import { LoginForm } from '../../organisms/LoginForm';

const LoginPage: React.VFC = () => {
  const handleSubmit: SubmitHandler<LoginFormModel> = (data) => {
    console.log(data);
  };
  return (
    <Container>
      <Typography component="h1" variant="h2">
        Sign In
      </Typography>
      <LoginForm onSubmit={handleSubmit} />
    </Container>
  );
};

export default LoginPage;
