import React from 'react';
import { Redirect } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import ResetPwdForm from '../../organisms/ResetPwdForm';
import { ResetPwdFormModel } from '../../types';
import BlankLayout from '../../../common/templates/BlankLayout';
import { useApi } from '../../../api';
import { useNavUtils, useQuery } from '../../../common/hooks';
import { isBadRequest } from '../../../error';

const ResetPwdPage: React.VFC = () => {
  const query = useQuery();
  const token = query.get('token');
  const api = useApi();
  const { redirect } = useNavUtils();
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit: SubmitHandler<ResetPwdFormModel> = React.useCallback(
    async (data) => {
      try {
        await api.resetPassword({
          token: token || '',
          password: data.newPassword,
        });
        enqueueSnackbar('Your password has been reseted.', { variant: 'success' });
        redirect('/');
      } catch (error) {
        if (isBadRequest(error)) {
          enqueueSnackbar('Your reset password link is expired.', { variant: 'error' });
          redirect('/');
        } else {
          throw error;
        }
      }
    },
    [api, redirect, enqueueSnackbar, token],
  );

  return token ? (
    <BlankLayout title="Reset password">
      <Typography paragraph>Please enter your new password in these fields below:</Typography>
      <ResetPwdForm onSubmit={handleSubmit} />
    </BlankLayout>
  ) : (
    <Redirect to="/" />
  );
};

export default ResetPwdPage;
