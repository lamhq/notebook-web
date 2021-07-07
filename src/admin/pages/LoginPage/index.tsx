import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import Typography from '@material-ui/core/Typography';
import { LoginFormModel } from '../../types';
import { LoginForm } from '../../organisms/LoginForm';
import { ApiErrorCode, ErrorHandler, useApi, useErrorHandler, ApiError } from '../../../api';
import { useSetIdentity } from '../../../identity';
import { useNavUtils } from '../../../common/hooks';
import { Container } from '../../../common/atoms/Container';

const LoginPage: React.VFC = () => {
  const api = useApi();
  const setIdentity = useSetIdentity();
  const { redirect } = useNavUtils();
  const { enqueueSnackbar } = useSnackbar();
  const defaultHandler = useErrorHandler();
  const handleError: ErrorHandler = React.useCallback(
    async (error) => {
      if (error instanceof ApiError && error.statusCode === ApiErrorCode.BadRequest) {
        enqueueSnackbar('Wrong email or password.', { variant: 'error' });
      } else {
        defaultHandler(error);
      }
    },
    [enqueueSnackbar, defaultHandler],
  );
  const handleSubmit: SubmitHandler<LoginFormModel> = async (data) => {
    try {
      const identity = await api.login(data);
      setIdentity(identity);
      redirect('/');
    } catch (error) {
      handleError(error);
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
