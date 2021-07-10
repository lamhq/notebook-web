import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { Link as RouterLink } from 'react-router-dom';
import { ProfileFormModel } from '../../types';
import ActionButtons from '../../../common/atoms/ActionButtons';
import { useFormErrorHandler } from '../../../error';
import LoadingButton from '../../../common/atoms/LoadingButton';

const schema = yup.object().shape({
  displayName: yup.string().required('This field is required'),
});

export interface ProfileFormProps {
  defaultValues: ProfileFormModel;
  onSubmit: SubmitHandler<ProfileFormModel>;
}

const ProfileForm: React.VFC<ProfileFormProps> = ({ defaultValues, onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    setError,
  } = useForm<ProfileFormModel>({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const handleFormError = useFormErrorHandler<ProfileFormModel>();
  const handleFormSubmit: SubmitHandler<ProfileFormModel> = React.useCallback(
    async (data) => {
      try {
        await onSubmit(data);
      } catch (error) {
        handleFormError(error, setError, 'Please correct your inputs');
      }
    },
    [onSubmit, handleFormError, setError],
  );

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Controller
            name="displayName"
            control={control}
            render={({ field }) => (
              <TextField
                label="Name"
                required
                error={!!errors.displayName}
                helperText={errors.displayName?.message}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Email" type="email" disabled />
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
      <ActionButtons>
        <Button variant="contained" color="default" component={RouterLink} to="/">
          Cancel
        </Button>
        <LoadingButton loading={isSubmitting} type="submit" variant="contained" color="primary">
          Submit
        </LoadingButton>
      </ActionButtons>
    </form>
  );
};

export default ProfileForm;
