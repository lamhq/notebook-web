import { useAtomValue } from 'jotai';
import { useCallback } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { requireAuth } from '../../../auth';
import { Title } from '../../../common/templates/MainLayout';
import { useErrorHandler } from '../../../error';
import { onActivityChangedAtom } from '../../atoms';
import { useGetActivityQuery, useUpdateActivityMutation } from '../../hooks';
import ActivityForm from '../../organisms/ActivityForm';
import type { ActivityFormData } from '../../types';

function UpdateActivityPage() {
  const { id: activityId } = useParams<{ id: string }>();
  if (!activityId) {
    throw new Error('Missing activity ID');
  }
  const [activity] = useGetActivityQuery(activityId);
  const [updateActivity] = useUpdateActivityMutation();
  const { onActivityChanged } = useAtomValue(onActivityChangedAtom);
  const navigate = useNavigate();
  const handleError = useErrorHandler();
  const formValues: ActivityFormData = {
    ...activity,
    time: new Date(activity.time),
  };
  const handleSubmit: SubmitHandler<ActivityFormData> = useCallback(
    async (data) => {
      try {
        await updateActivity({ id: activityId, ...data });
        onActivityChanged();
        void navigate('/');
      } catch (error) {
        handleError(error);
      }
    },
    [activityId, updateActivity, navigate],
  );

  return (
    <>
      <Title>Update Activity</Title>
      <ActivityForm defaultValues={formValues} onSubmit={handleSubmit} />
    </>
  );
}

export default requireAuth(UpdateActivityPage);
