import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { ActivityFormModel } from '../../types';
import SubLayout from '../../../common/templates/SubLayout';
import ActivityForm from '../../containers/ActivityForm';
import { useApi } from '../../../api';
import { useNavUtils } from '../../../common/hooks';

const UpdateActivityPage: React.VFC = () => {
  const { id } = useParams<{ id: string }>();
  const api = useApi();
  const { redirect } = useNavUtils();
  const handleSubmit: SubmitHandler<ActivityFormModel> = React.useCallback(
    async (data) => {
      await api.updateActivity(id, data);
      redirect('/');
    },
    [id, api, redirect],
  );

  return (
    <SubLayout title="Update Activity">
      <ActivityForm activityId={id} onSubmit={handleSubmit} />
    </SubLayout>
  );
};

export default UpdateActivityPage;
