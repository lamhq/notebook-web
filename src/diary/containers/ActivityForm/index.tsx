import React, { useCallback } from 'react';
import { ApiErrorBoundary } from '../../../error';
import LoadingFallback from '../../../common/atoms/LoadingFallback';
import { Activity, ActivityFormModel } from '../../types';
import { useApi } from '../../../api';
import { useAsyncData } from '../../../common/hooks';
import ActivityFormView, {
  ActivityFormProps as ActivityFormViewProps,
} from '../../organisms/ActivityForm';

function useActivityDetail(activityId: string): Activity | undefined {
  const api = useApi();
  const loadActivity = useCallback(() => api.getActivity(activityId), [api, activityId]);
  const result = useAsyncData(loadActivity);
  return result;
}

export interface ActivityFormProps {
  activityId: string;
  onSubmit: ActivityFormViewProps['onSubmit'];
}

const LoadableActivityEditForm: React.VFC<ActivityFormProps> = ({ activityId, onSubmit }) => {
  const activity = useActivityDetail(activityId);
  if (activity === undefined) return <LoadingFallback />;

  const formValues: ActivityFormModel = {
    content: activity.content,
    tags: activity.tags,
    time: new Date(activity.time),
    income: activity.income || '',
    outcome: activity.outcome || '',
  };
  return <ActivityFormView defaultValues={formValues} onSubmit={onSubmit} />;
};

const ActivityForm: React.VFC<ActivityFormProps> = ({ activityId, onSubmit }) => {
  return (
    <ApiErrorBoundary>
      <LoadableActivityEditForm activityId={activityId} onSubmit={onSubmit} />
    </ApiErrorBoundary>
  );
};

export default ActivityForm;
