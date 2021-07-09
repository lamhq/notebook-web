import React from 'react';
import { useSnackbar } from 'notistack';
import { useNavUtils } from '../../common/hooks';
import { ApiErrorCode, ErrorHandler } from '../types';
import { isApiError } from '../utils';

export default function useErrorHandler(): ErrorHandler {
  const { enqueueSnackbar } = useSnackbar();
  const { redirect } = useNavUtils();
  return React.useCallback(
    async (error) => {
      if (!isApiError(error)) {
        enqueueSnackbar('An error occurred in the app.', { variant: 'error' });
        return;
      }

      switch (error.code) {
        case ApiErrorCode.NetworkError:
          enqueueSnackbar('Please check your internet connection.', { variant: 'error' });
          break;

        case ApiErrorCode.BadRequest:
          enqueueSnackbar('The request sent to server is invalid.', {
            variant: 'error',
          });
          break;

        case ApiErrorCode.Notfound:
          enqueueSnackbar('The thing you are looking for was not found.', {
            variant: 'error',
          });
          break;

        case ApiErrorCode.ServerError:
          enqueueSnackbar('Our server is having an issue.', {
            variant: 'error',
          });
          break;

        case ApiErrorCode.Unauthenticated:
          enqueueSnackbar('Your have to login to continue.', { variant: 'error' });
          redirect('/login');
          break;

        case ApiErrorCode.Unauthorized:
          enqueueSnackbar('Your cannot access this section right now.', { variant: 'error' });
          break;

        case ApiErrorCode.GatewayTimeout:
          enqueueSnackbar('Our server did not return any response.', { variant: 'error' });
          break;

        default:
          enqueueSnackbar('An unknow error occured.', { variant: 'error' });
          break;
      }
    },
    [enqueueSnackbar, redirect],
  );
}
