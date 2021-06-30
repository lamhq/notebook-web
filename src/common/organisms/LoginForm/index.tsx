import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';

import { LoginFormModel } from '../../types';
import { LoadingButton } from '../../atoms/LoadingButton';

export interface ResetPwdFormProps {
  onSubmit: SubmitHandler<LoginFormModel>;
}

export const LoginForm: React.VFC<ResetPwdFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormModel>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField label="Email" type="email" {...register('email')} />
      <TextField
        label="Password"
        type="password"
        {...register('password')}
        helperText={
          <>
            <Link to="/forgot-pwd" variant="body2" component={RouterLink}>
              Forgot password?
            </Link>
          </>
        }
      />
      <FormControl>
        <LoadingButton
          loading={isSubmitting}
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
        >
          SIGN IN
        </LoadingButton>
      </FormControl>
    </form>
  );
};
