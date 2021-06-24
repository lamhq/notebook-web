import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { ProfileFormModel } from '../../types';

export interface ProfileFormProps {
  defaultValues: ProfileFormModel;
  onSubmit: SubmitHandler<ProfileFormModel>;
}

export const ProfileForm: React.VFC<ProfileFormProps> = ({ defaultValues, onSubmit }) => {
  const { control, handleSubmit } = useForm<ProfileFormModel>({
    defaultValues,
  });

  return (
    <form id="profileForm" onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Controller name="displayName" control={control} as={TextField} label="Name" />
        </Grid>
        <Grid item xs={12}>
          <Controller name="email" control={control} as={TextField} label="Email" disabled />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
            value="123456"
            type="password"
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton size="small">
                    <EditIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
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
