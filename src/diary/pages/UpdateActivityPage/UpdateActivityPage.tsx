import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { Title } from '../../../common/templates/MainLayout';
import { useGetActivityQuery, useUpdateActivityMutation } from '../../hooks';
import ActivityForm from '../../organisms/ActivityForm';
import type { ActivityFormData } from '../../types';

export default function UpdateActivityPage() {
  const { id: activityId } = useParams<{ id: string }>();
  if (!activityId) {
    throw new Error('Missing activity ID');
  }
  const [activity] = useGetActivityQuery(activityId);
  const [updateActivity] = useUpdateActivityMutation();
  const navigate = useNavigate();
  const formValues: ActivityFormData = {
    ...activity,
    time: new Date(activity.time),
    income: activity.income ? activity.income.toString() : '',
    outcome: activity.outcome ? activity.outcome.toString() : '',
  };
  const handleSubmit: SubmitHandler<ActivityFormData> = React.useCallback(
    async (data) => {
      await updateActivity({ id: activityId, data });
      void navigate('/');
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
