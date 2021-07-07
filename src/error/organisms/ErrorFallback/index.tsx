import React from 'react';
import WarningIcon from '@material-ui/icons/Warning';
import SearchIcon from '@material-ui/icons/Search';
import BlockIcon from '@material-ui/icons/Block';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { FallbackProps } from 'react-error-boundary';
import { ActionButtons } from '../../../common/atoms/ActionButtons';
import { ApiError, ApiErrorCode } from '../../types';

const ErrorFallback: React.VFC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  let message = 'An error occurred in the app.';
  let icon: React.ReactElement = <WarningIcon style={{ fontSize: '5rem' }} />;
  if (error instanceof ApiError) {
    switch (error.statusCode) {
      case ApiErrorCode.NetworkError:
        message = 'Please check your internet connection.';
        icon = <WarningIcon style={{ fontSize: '5rem' }} />;
        break;

      case ApiErrorCode.Notfound:
        message = "The one you're looking for was not found.";
        icon = <SearchIcon style={{ fontSize: '5rem' }} />;
        break;

      case ApiErrorCode.Unauthorized:
        message = 'Your cannot access this section right now.';
        icon = <BlockIcon style={{ fontSize: '5rem' }} />;
        break;

      case ApiErrorCode.ServerError:
        message = 'An error occurred while processing your request.';
        break;

      default:
        break;
    }
  }
  return (
    <div role="alert">
      <Typography align="center" paragraph>
        {icon}
      </Typography>
      <Typography align="center" paragraph component="div">
        {message}
      </Typography>
      <ActionButtons>
        <Button color="primary" variant="contained" onClick={resetErrorBoundary}>
          Try again
        </Button>
      </ActionButtons>
    </div>
  );
};

export default ErrorFallback;
