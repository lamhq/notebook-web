import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { Link as RouterLink } from 'react-router-dom';
import { ProfileFormModel } from '../../types';
import { Buttons } from '../../atoms/Buttons';

export interface ProfileFormProps {
  defaultValues: ProfileFormModel;
  onSubmit: SubmitHandler<ProfileFormModel>;
}

export const ProfileForm: React.VFC<ProfileFormProps> = ({ defaultValues, onSubmit }) => {
  const { register, handleSubmit } = useForm<ProfileFormModel>({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField label="Name" {...register('displayName')} />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Email" type="email" {...register('email')} disabled />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
            value="******"
            type="password"
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton size="small" component={RouterLink} to="/profile/change-pwd">
                    <EditIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
      <Buttons>
        <Button variant="contained" color="default" component={RouterLink} to="/">
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Buttons>
    </form>
  );
};
