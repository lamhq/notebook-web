import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ChangePwdFormModel } from '../../types';

export interface ChangePwdFormProps {
  onSubmit: SubmitHandler<ChangePwdFormModel>;
}

export const ChangePwdForm: React.VFC<ChangePwdFormProps> = ({ onSubmit }) => {
  const { control, handleSubmit } = useForm<ChangePwdFormModel>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  return (
    <form id="profileForm" onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Controller
            name="currentPassword"
            control={control}
            as={TextField}
            label="Password"
            type="password"
          />
        </Grid>
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
      <Box display="flex" justifyContent="center" gridColumnGap={16}>
        <Button variant="contained" color="default">
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </form>
  );
};
