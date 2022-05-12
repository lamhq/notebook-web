import React, { useCallback } from 'react';
import ProfileForm, { ProfileFormProps } from '../../organisms/ProfileForm';
import { ApiErrorBoundary } from '../../../error';
import LoadingFallback from '../../../common/atoms/LoadingFallback';
import { useApi } from '../../../api';
import { useAsyncData } from '../../../common/hooks';
import { Profile } from '../../types';

function useProfile(): Profile | undefined {
  const api = useApi();
  const loadProfile = useCallback(() => api.getProfile(), [api]);
  const result = useAsyncData(loadProfile);
  return result;
}

export type ProfileEditFormProps = Omit<ProfileFormProps, 'defaultValues'>;

const ProfileFormLoader: React.VFC<ProfileEditFormProps> = ({ onSubmit }) => {
  const profile = useProfile();
  if (profile === undefined) return <LoadingFallback />;
  return <ProfileForm defaultValues={profile} onSubmit={onSubmit} />;
};

const ProfileEditForm: React.VFC<ProfileEditFormProps> = (props) => {
  return (
    <ApiErrorBoundary>
      <ProfileFormLoader {...props} />
    </ApiErrorBoundary>
  );
};

export default ProfileEditForm;
