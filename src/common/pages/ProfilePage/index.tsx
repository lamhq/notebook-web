import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { MainLayout } from '../../templates/MainLayout';
import { ProfileForm } from '../../organisms/ProfileForm';
import { ProfileFormModel } from '../../types';
import { withAuth } from '../../../identity';

const defaultValues: ProfileFormModel = {
  displayName: 'John Doe',
  email: 'john@example.com',
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

export default withAuth()(ProfilePage);