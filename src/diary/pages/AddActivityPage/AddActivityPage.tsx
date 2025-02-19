import { useCallback } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { requireAuth } from '../../../auth';
import { Title } from '../../../common/templates/MainLayout';
import { useErrorHandler } from '../../../error';
// import { useEvent } from '../../../event';
// import { ACTIVITY_CHANGED_EVENT } from '../../constants';
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
  // const eventEmitter = useEvent();
  const handleError = useErrorHandler();
  const handleSubmit: SubmitHandler<ActivityFormData> = useCallback(
    async (data) => {
      try {
        await addActivity(data);
        // const activity = await addActivity(data);
        // eventEmitter.emit(ACTIVITY_CHANGED_EVENT, activity);
        void navigate('/');
      } catch (error) {
        handleError(error);
      }
    },
    [addActivity, navigate, handleError],
  );

  return (
    <>
      <Title>Add Activity</Title>
      <ActivityForm defaultValues={defaultValues} onSubmit={handleSubmit} />
    </>
  );
}

export default requireAuth(AddActivityPage);
