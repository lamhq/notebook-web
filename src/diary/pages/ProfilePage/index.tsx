import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { ProfileFormModel } from '../../types';
import { MainLayout } from '../../../common/templates/MainLayout';
import { ProfileForm } from '../../../common/organisms/ProfileForm';

const defaultValues: ProfileFormModel = {
  displayName: 'John Doe',
};

const ProfilePage: React.VFC = () => {
  const handleSubmit: SubmitHandler<ProfileFormModel> = (data) => {
    console.log(data);
  };

  return (
    <MainLayout title="Update Profile">
      <ProfileForm defaultValues={defaultValues} onSubmit={handleSubmit} />
    </MainLayout>
  );
};

export default ProfilePage;
