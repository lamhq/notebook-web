import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ResetPwdFormModel } from '../../types';
import { Actions } from '../../atoms/Actions';

export interface ResetPwdFormProps {
  onSubmit: SubmitHandler<ResetPwdFormModel>;
}

export const ResetPwdForm: React.VFC<ResetPwdFormProps> = ({ onSubmit }) => {
  const { control, handleSubmit } = useForm<ResetPwdFormModel>({
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Controller
            name="password"
            control={control}
            as={TextField}
            label="New Password"
            type="password"
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="confirmPassword"
            control={control}
            as={TextField}
            label="Repeat Password"
            type="password"
          />
        </Grid>
      </Grid>
      <Actions>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Actions>
    </form>
  );
};
