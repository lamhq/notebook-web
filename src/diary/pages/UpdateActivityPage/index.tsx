import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { ActivityFormModel } from '../../types';
import { SubLayout } from '../../../common/templates/SubLayout';
import { ActivityForm } from '../../organisms/ActivityForm';
import { withAuth } from '../../../identity';

const defaultValues: ActivityFormModel = {
  content: '',
  tags: [],
  time: new Date(),
  income: 0,
  outcome: 0,
};

const UpdateActivityPage: React.VFC = () => {
  const handleSubmit: SubmitHandler<ActivityFormModel> = (data) => {
    console.log(data);
  };

  return (
    <SubLayout title="Update Activity">
      <ActivityForm defaultValues={defaultValues} onSubmit={handleSubmit} />
    </SubLayout>
  );
};

export default withAuth()(UpdateActivityPage);
