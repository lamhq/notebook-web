import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ForgotPwdFormModel } from '../../types';
import { Actions } from '../../atoms/Actions';

export interface ForgotPwdFormProps {
  onSubmit: SubmitHandler<ForgotPwdFormModel>;
}

export const ForgotPwdForm: React.VFC<ForgotPwdFormProps> = ({ onSubmit }) => {
  const { control, handleSubmit } = useForm<ForgotPwdFormModel>({
    defaultValues: {
      email: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Controller name="email" control={control} as={TextField} label="Email" type="email" />
        </Grid>
      </Grid>
      <Actions>
        <Button type="submit" variant="contained" color="primary">
          Reset password
        </Button>
      </Actions>
    </form>
  );
};
