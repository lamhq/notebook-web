import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';

import { LoginFormModel } from '../../types';

export interface ResetPwdFormProps {
  onSubmit: SubmitHandler<LoginFormModel>;
}

export const LoginForm: React.VFC<ResetPwdFormProps> = ({ onSubmit }) => {
  const { control, handleSubmit } = useForm<LoginFormModel>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller name="email" control={control} as={TextField} label="Email" type="email" />
      <Controller
        name="password"
        control={control}
        as={TextField}
        label="Email"
        type="password"
        helperText={
          <>
            <Link to="/forgot-pwd" variant="body2" component={RouterLink}>
              Forgot password?
            </Link>
          </>
        }
      />
      <FormControl>
        <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
          SIGN IN
        </Button>
      </FormControl>
    </form>
  );
};
