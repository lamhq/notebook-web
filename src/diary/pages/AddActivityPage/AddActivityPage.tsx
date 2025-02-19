import { useAtomValue } from 'jotai';
import { useCallback } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { requireAuth } from '../../../auth';
import { Title } from '../../../common/templates/MainLayout';
import { useErrorHandler } from '../../../error';
import { onActivityChangedAtom } from '../../atoms';
import { useAddActivityMutation } from '../../hooks';
import ActivityForm from '../../organisms/ActivityForm';
import type { ActivityFormData } from '../../types';

const defaultValues: ActivityFormData = {
  content: '',
  tags: [],
  time: new Date(),
};

function AddActivityPage() {
  const { executeMutation: addActivity } = useAddActivityMutation();
  const navigate = useNavigate();
  const { onActivityChanged } = useAtomValue(onActivityChangedAtom);
  const handleError = useErrorHandler();
  const handleSubmit: SubmitHandler<ActivityFormData> = useCallback(
    async (data) => {
      try {
        await addActivity(data);
        onActivityChanged();
        void navigate('/');
      } catch (error) {
        handleError(error);
      }
    },
    [addActivity, navigate, onActivityChanged, handleError],
  );

  return (
    <>
      <Title>Add Activity</Title>
      <ActivityForm defaultValues={defaultValues} onSubmit={handleSubmit} />
    </>
  );
}

export default requireAuth(AddActivityPage);
