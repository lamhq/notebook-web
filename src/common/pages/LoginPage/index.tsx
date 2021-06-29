import React from 'react';
import Typography from '@material-ui/core/Typography';
import { SubmitHandler } from 'react-hook-form';
import { Container } from '../../atoms/Container';
import { LoginFormModel } from '../../types';
import { LoginForm } from '../../organisms/LoginForm';
import { useApi } from '../../../api';
import { useSetIdentity } from '../../../identity';
import { useNavigator } from '../../hooks';

const LoginPage: React.VFC = () => {
  const api = useApi();
  const setIdentity = useSetIdentity();
  const { redirect } = useNavigator();
  const handleSubmit: SubmitHandler<LoginFormModel> = async (data) => {
    const identity = await api.login(data);
    setIdentity(identity);
    redirect('/');
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
