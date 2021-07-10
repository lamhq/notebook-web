import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ErrorBoundary } from 'react-error-boundary';
import ProfileForm, { ProfileFormProps } from '../../organisms/ProfileForm';
import { profileState, refreshProfileFlag } from './states';
import { ErrorFallback, ErrorHandler, isUnauthenticated, useErrorHandler } from '../../../error';
import LoadingFallback from '../../../common/atoms/LoadingFallback';
import { ProfileFormModel } from '../../types';

export type ProfileEditFormProps = Omit<ProfileFormProps, 'defaultValues'>;

const LoadableProfileForm: React.VFC<ProfileEditFormProps> = ({ onSubmit }) => {
  const profile = useRecoilValue(profileState);
  const formValues: ProfileFormModel = profile;
  return <ProfileForm defaultValues={formValues} onSubmit={onSubmit} />;
};

const ProfileEditForm: React.VFC<ProfileEditFormProps> = (props) => {
  const [refreshFlag, setRefreshFlag] = useRecoilState(refreshProfileFlag);
  const refreshProfile = React.useCallback(() => setRefreshFlag(Date.now()), [setRefreshFlag]);
  const defaultHandler = useErrorHandler();
  const handleError: ErrorHandler = React.useCallback(
    async (error) => {
      if (isUnauthenticated(error)) {
        defaultHandler(error);
      }
    },
    [defaultHandler],
  );

  // invalidate activity data when component is unmounted
  React.useEffect(() => refreshProfile, [refreshProfile]);

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={refreshProfile}
      resetKeys={[refreshFlag]}
      onError={handleError}
    >
      <React.Suspense fallback={<LoadingFallback />}>
        <LoadableProfileForm {...props} />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default ProfileEditForm;
