import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ErrorBoundary } from 'react-error-boundary';
import ActivityForm, { ActivityFormProps } from '../../organisms/ActivityForm';
import { activityDetailState, refreshActivityFlag } from './states';
import {
  ApiError,
  ApiErrorCode,
  ErrorFallback,
  ErrorHandler,
  useErrorHandler,
} from '../../../error';
import LoadingFallback from '../../../common/atoms/LoadingFallback';
import { ActivityFormModel } from '../../types';

export interface ActivityEditFormProps {
  activityId: string;
  onSubmit: ActivityFormProps['onSubmit'];
}

const LoadableActivityEditForm: React.VFC<ActivityEditFormProps> = ({ activityId, onSubmit }) => {
  const activity = useRecoilValue(activityDetailState(activityId));
  const formValues: ActivityFormModel = {
    content: activity.content,
    tags: activity.tags,
    time: new Date(activity.time),
    income: activity.income || '',
    outcome: activity.outcome || '',
  };
  return <ActivityForm defaultValues={formValues} onSubmit={onSubmit} />;
};

const ActivityEditForm: React.VFC<ActivityEditFormProps> = ({ activityId, onSubmit }) => {
  const [refreshFlag, setRefreshFlag] = useRecoilState(refreshActivityFlag);
  const refreshActivity = React.useCallback(() => setRefreshFlag(Date.now()), [setRefreshFlag]);
  const defaultHandler = useErrorHandler();
  const handleError: ErrorHandler = React.useCallback(
    async (error) => {
      if (error instanceof ApiError && error.statusCode === ApiErrorCode.Unauthenticated) {
        defaultHandler(error);
      }
    },
    [defaultHandler],
  );

  // invalidate activity data when component is unmounted
  React.useEffect(() => refreshActivity, [refreshActivity]);

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={refreshActivity}
      resetKeys={[refreshFlag]}
      onError={handleError}
    >
      <React.Suspense fallback={<LoadingFallback />}>
        <LoadableActivityEditForm activityId={activityId} onSubmit={onSubmit} />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default ActivityEditForm;
