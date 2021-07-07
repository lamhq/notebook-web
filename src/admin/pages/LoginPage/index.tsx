import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { LoginFormModel } from '../../types';
import LoginForm from '../../organisms/LoginForm';
import { ApiErrorCode, ErrorHandler, useErrorHandler, ApiError } from '../../../error';
import { useApi } from '../../../api';
import { useSetIdentity } from '../../../identity';
import { useNavUtils } from '../../../common/hooks';
import BlankLayout from '../../../common/templates/BlankLayout';

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
    <BlankLayout title="Sign In">
      <LoginForm onSubmit={handleSubmit} />
    </BlankLayout>
  );
};

export default LoginPage;
