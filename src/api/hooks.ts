import { useSnackbar } from 'notistack';
import React from 'react';
import { useNavUtils } from '../common/hooks';
import { ApiContext } from './contexts';
import { ApiClient, ApiErrorCode, ApiErrorHandler } from './types';

export function useApi(): ApiClient {
  const contextVal = React.useContext(ApiContext);
  if (!contextVal) {
    throw new Error('This component must be used inside a <ApiProvider> component.');
  }
  return contextVal;
}

export function useApiErrorHandler(customHandler?: ApiErrorHandler): ApiErrorHandler {
  const { enqueueSnackbar } = useSnackbar();
  const { redirect } = useNavUtils();
  const errorHandler: ApiErrorHandler = React.useCallback(
    async (error) => {
      if (customHandler) {
        const processed = await customHandler(error);
        if (processed) return false;
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
          redirect('/forbidden');
          break;

        default:
          enqueueSnackbar('An unknow error occured. Please try again later.', { variant: 'error' });
          break;
      }
      return true;
    },
    [customHandler, enqueueSnackbar, redirect],
  );
  return errorHandler;
}
