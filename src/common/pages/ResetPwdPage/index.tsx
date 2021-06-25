import React from 'react';
import Typography from '@material-ui/core/Typography';
import { SubmitHandler } from 'react-hook-form';
import { ResetPwdForm } from '../../organisms/ResetPwdForm';
import { ResetPwdFormModel } from '../../types';
import { Container } from '../../atoms/Container';

const ResetPwdPage: React.VFC = () => {
  const handleSubmit: SubmitHandler<ResetPwdFormModel> = (data) => {
    console.log(data);
  };

  return (
    <Container>
      <Typography component="h1" variant="h2">
        Reset password
      </Typography>
      <Typography paragraph>Please enter your new password in these fields below:</Typography>
      <ResetPwdForm onSubmit={handleSubmit} />
    </Container>
  );
};

export default ResetPwdPage;
