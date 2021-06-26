import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import Typography from '@material-ui/core/Typography';
import { ForgotPwdForm } from '../../organisms/ForgotPwdForm';
import { SubLayout } from '../../templates/SubLayout';
import { ForgotPwdFormModel } from '../../types';

const ForgotPwdPage: React.VFC = () => {
  const handleSubmit: SubmitHandler<ForgotPwdFormModel> = (data) => {
    console.log(data);
  };

  return (
    <SubLayout title="Forgot password" backUrl="/login">
      <Typography align="center" paragraph>
        Please enter your registered email so you can reset your password.
      </Typography>
      <ForgotPwdForm onSubmit={handleSubmit} />
    </SubLayout>
  );
};

export default ForgotPwdPage;
