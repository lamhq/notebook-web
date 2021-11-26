import React from 'react';
import { useSnackbar } from 'notistack';
import { useErrorHandler, isBadRequest } from '../../../error';
import { useApi } from '../../../api';
import { useSetIdentity } from '../../../identity';
import { useNavUtils } from '../../../common/hooks';
import BlankLayout from '../../../common/templates/BlankLayout';
import GoogleLoginForm from '../../organisms/GoogleLoginForm';

const LoginPage: React.VFC = () => {
  const api = useApi();
  const setIdentity = useSetIdentity();
  const { redirect } = useNavUtils();
  const { enqueueSnackbar } = useSnackbar();
  const handleError = useErrorHandler();
  const handleLogin = React.useCallback(
    async (token) => {
      try {
        const identity = await api.googleLogin(token);
        setIdentity(identity);
        redirect('/');
      } catch (error: Error) {
        if (isBadRequest(error)) {
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
      <GoogleLoginForm onLoginSuccess={handleLogin} />
    </BlankLayout>
  );
};

export default LoginPage;
