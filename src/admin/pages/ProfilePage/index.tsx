import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { useApi } from '../../../api';
import { ProfileFormModel } from '../../types';
import { withAuth } from '../../../identity';
import MainLayout from '../../../common/templates/MainLayout';
import ProfileEditForm from '../../containers/ProfileEditForm';

const ProfilePage: React.VFC = () => {
  const api = useApi();
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit: SubmitHandler<ProfileFormModel> = React.useCallback(
    async (data) => {
      await api.updateProfile(data);
      enqueueSnackbar('Your profile has been updated.', { variant: 'success' });
    },
    [api, enqueueSnackbar],
  );

  return (
    <MainLayout title="Update Profile">
      <ProfileEditForm onSubmit={handleSubmit} />
    </MainLayout>
  );
};

export default withAuth()(ProfilePage);
