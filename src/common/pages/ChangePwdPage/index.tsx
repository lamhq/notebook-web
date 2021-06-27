import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { ChangePwdForm } from '../../organisms/ChangePwdForm';
import { SubLayout } from '../../templates/SubLayout';
import { ChangePwdFormModel } from '../../types';
import { withAuth } from '../../../identity';

const ChangePwdPage: React.VFC = () => {
  const handleSubmit: SubmitHandler<ChangePwdFormModel> = (data) => {
    console.log(data);
  };

  return (
    <SubLayout title="Change password">
      <ChangePwdForm onSubmit={handleSubmit} />
    </SubLayout>
  );
};

export default withAuth()(ChangePwdPage);
