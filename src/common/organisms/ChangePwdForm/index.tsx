import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ChangePwdFormModel } from '../../types';
import { ActionButtons } from '../../atoms/ActionButtons';
import { useNavUtils } from '../../hooks';

export interface ChangePwdFormProps {
  onSubmit: SubmitHandler<ChangePwdFormModel>;
}

export const ChangePwdForm: React.VFC<ChangePwdFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm<ChangePwdFormModel>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });
  const { getLinkProps } = useNavUtils();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField label="Current Password" type="password" {...register('currentPassword')} />
        </Grid>
        <Grid item xs={12}>
          <TextField label="New Password" type="password" {...register('newPassword')} />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Repeat Password" type="password" {...register('confirmPassword')} />
        </Grid>
      </Grid>
      <ActionButtons>
        <Button variant="contained" color="default" {...getLinkProps()}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </ActionButtons>
    </form>
  );
};
