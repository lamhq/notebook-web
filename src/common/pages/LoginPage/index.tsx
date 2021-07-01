import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import Typography from '@material-ui/core/Typography';
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
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit: SubmitHandler<LoginFormModel> = async (data) => {
    try {
      const identity = await api.login(data);
      setIdentity(identity);
      redirect('/');
    } catch (error) {
      enqueueSnackbar('Wrong email or password.', { variant: 'error' });
    }
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
