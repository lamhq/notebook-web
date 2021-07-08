import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { LoginFormModel } from '../../types';
import LoginForm from '../../organisms/LoginForm';
import { ApiErrorCode, useErrorHandler, ApiError } from '../../../error';
import { useApi } from '../../../api';
import { useSetIdentity } from '../../../identity';
import { useNavUtils } from '../../../common/hooks';
import BlankLayout from '../../../common/templates/BlankLayout';

const LoginPage: React.VFC = () => {
  const api = useApi();
  const setIdentity = useSetIdentity();
  const { redirect } = useNavUtils();
  const { enqueueSnackbar } = useSnackbar();
  const handleError = useErrorHandler();
  const handleSubmit: SubmitHandler<LoginFormModel> = React.useCallback(
    async (data) => {
      try {
        const identity = await api.login(data);
        setIdentity(identity);
        redirect('/');
      } catch (error) {
        if (error instanceof ApiError && error.statusCode === ApiErrorCode.BadRequest) {
          enqueueSnackbar('Wrong email or password.', { variant: 'error' });
        } else {
          handleError(error);
        }
      }
    },
    [api, setIdentity, redirect, handleError, enqueueSnackbar],
  );

  return (
    <BlankLayout title="Sign In">
      <LoginForm onSubmit={handleSubmit} />
    </BlankLayout>
  );
};

export default LoginPage;
