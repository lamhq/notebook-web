import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ResetPwdFormModel } from '../../types';
import ActionButtons from '../../../common/atoms/ActionButtons';

export interface ResetPwdFormProps {
  onSubmit: SubmitHandler<ResetPwdFormModel>;
}

const ResetPwdForm: React.VFC<ResetPwdFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm<ResetPwdFormModel>({
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField label="New Password" type="password" {...register('newPassword')} />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Repeat Password" type="password" {...register('confirmPassword')} />
        </Grid>
      </Grid>
      <ActionButtons>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </ActionButtons>
    </form>
  );
};

export default ResetPwdForm;
