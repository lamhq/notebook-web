import { FieldValues } from 'react-hook-form';
import { ApiError, ApiErrorCode, FormError } from './types';

export function isApiError(error: unknown): error is ApiError {
  return (error as ApiError).code !== undefined;
}

export function isUnauthenticated(error: unknown): boolean {
  return isApiError(error) && error.code === ApiErrorCode.Unauthenticated;
}

export function isBadRequest(error: unknown): boolean {
  return isApiError(error) && error.code === ApiErrorCode.BadRequest;
}

export function isFormError<TFieldValues extends FieldValues>(
  error: unknown,
): error is FormError<TFieldValues> {
  return isApiError(error) && error.details !== undefined;
}
