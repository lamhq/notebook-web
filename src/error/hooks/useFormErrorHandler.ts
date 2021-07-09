import React from 'react';
import { useSnackbar } from 'notistack';
import { FieldPath, FieldValues } from 'react-hook-form';
import { FormErrorHandler } from '../types';
import { isFormError } from '../utils';
import useErrorHandler from './useErrorHandler';

export default function useFormErrorHandler<
  TFieldValues extends FieldValues = FieldValues
>(): FormErrorHandler<TFieldValues> {
  const { enqueueSnackbar } = useSnackbar();
  const handleError = useErrorHandler();
  return React.useCallback(
    async (error, setError, message) => {
      if (isFormError<TFieldValues>(error)) {
        if (message) {
          enqueueSnackbar('Please correct your input.', { variant: 'error' });
        }
        Object.entries(error.details).forEach(([field, msg]) => {
          setError(field as FieldPath<TFieldValues>, { message: msg }, { shouldFocus: true });
        });
      } else {
        handleError(error);
      }
    },
    [enqueueSnackbar, handleError],
  );
}
