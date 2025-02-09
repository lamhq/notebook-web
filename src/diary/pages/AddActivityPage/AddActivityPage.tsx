import { useCallback } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { Title } from '../../../common/templates/MainLayout';
import { useAddActivityMutation } from '../../hooks';
import ActivityForm from '../../organisms/ActivityForm';
import type { ActivityFormData } from '../../types';

const defaultValues: ActivityFormData = {
  content: '',
  tags: [],
  time: new Date(),
  income: '',
  outcome: '',
};

export default function AddActivityPage() {
  const [addActivity] = useAddActivityMutation();
  const navigate = useNavigate();
  const handleSubmit: SubmitHandler<ActivityFormData> = useCallback(
    async (data) => {
      await addActivity(data);
      void navigate('/');
    },
    [addActivity, navigate],
  );

  return (
    <>
      <Title>Add Activity</Title>
      <ActivityForm defaultValues={defaultValues} onSubmit={handleSubmit} />
    </>
  );
}
