import { useSnackbar } from 'notistack';
import React from 'react';
import { useNavUtils } from '../../common/hooks';
import { ApiError, ApiErrorCode, ErrorHandler } from '../types';

export default function useErrorHandler(): ErrorHandler {
  const { enqueueSnackbar } = useSnackbar();
  const { redirect } = useNavUtils();
  const errorHandler: ErrorHandler = React.useCallback(
    async (error) => {
      if (!(error instanceof ApiError)) {
        enqueueSnackbar('An error occurred in the app.', { variant: 'error' });
        return;
      }

      switch (error.statusCode) {
        case ApiErrorCode.NetworkError:
          enqueueSnackbar('Please check your internet connection.', { variant: 'error' });
          break;

        case ApiErrorCode.BadRequest:
        case ApiErrorCode.Notfound:
          enqueueSnackbar("Unable to proccess your request. We're fixing this.", {
            variant: 'error',
          });
          break;

        case ApiErrorCode.ServerError:
          enqueueSnackbar('Our server is having an issue. Please try again later.', {
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

        default:
          enqueueSnackbar('An unknow error occured. Please try again later.', { variant: 'error' });
          break;
      }
    },
    [enqueueSnackbar, redirect],
  );

  return errorHandler;
}
