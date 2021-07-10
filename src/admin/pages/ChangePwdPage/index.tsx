import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import ChangePwdForm from '../../organisms/ChangePwdForm';
import SubLayout from '../../../common/templates/SubLayout';
import { ChangePwdFormModel } from '../../types';
import { useApi } from '../../../api';
import { useNavUtils } from '../../../common/hooks';

const ChangePwdPage: React.VFC = () => {
  const api = useApi();
  const { redirect } = useNavUtils();
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit: SubmitHandler<ChangePwdFormModel> = React.useCallback(
    async (data) => {
      await api.changePassword(data);
      enqueueSnackbar('Your password has been updated.', { variant: 'success' });
      redirect('/');
    },
    [api, redirect, enqueueSnackbar],
  );

  return (
    <SubLayout title="Change password">
      <ChangePwdForm onSubmit={handleSubmit} />
    </SubLayout>
  );
};

export default ChangePwdPage;
