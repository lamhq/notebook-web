import React from 'react';
import Typography from '@material-ui/core/Typography';
import { SubmitHandler } from 'react-hook-form';
import ResetPwdForm from '../../organisms/ResetPwdForm';
import { ResetPwdFormModel } from '../../types';
import BlankLayout from '../../../common/templates/BlankLayout';

const ResetPwdPage: React.VFC = () => {
  const handleSubmit: SubmitHandler<ResetPwdFormModel> = (data) => {
    console.log(data);
  };

  return (
    <BlankLayout title="Reset password">
      <Typography paragraph>Please enter your new password in these fields below:</Typography>
      <ResetPwdForm onSubmit={handleSubmit} />
    </BlankLayout>
  );
};

export default ResetPwdPage;
