import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ForgotPwdFormModel } from '../../types';
import { ActionButtons } from '../../../common/atoms/ActionButtons';

export interface ForgotPwdFormProps {
  onSubmit: SubmitHandler<ForgotPwdFormModel>;
}

export const ForgotPwdForm: React.VFC<ForgotPwdFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm<ForgotPwdFormModel>({
    defaultValues: {
      email: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField label="Email" type="email" {...register('email')} />
        </Grid>
      </Grid>
      <ActionButtons>
        <Button type="submit" variant="contained" color="primary">
          Reset password
        </Button>
      </ActionButtons>
    </form>
  );
};
