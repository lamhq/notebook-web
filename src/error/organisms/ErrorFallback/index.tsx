import React from 'react';
import WarningIcon from '@material-ui/icons/Warning';
import SearchIcon from '@material-ui/icons/Search';
import BlockIcon from '@material-ui/icons/Block';
import CloudOffIcon from '@material-ui/icons/CloudOff';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { FallbackProps } from 'react-error-boundary';
import ButtonsContainer from '../../../common/atoms/ButtonsContainer';
import { ApiErrorCode } from '../../types';
import { isApiError } from '../../utils';

const ErrorFallback: React.VFC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  let message = 'An error occurred in the app.';
  let icon: React.ReactElement = <WarningIcon style={{ fontSize: '5rem' }} />;
  if (isApiError(error)) {
    switch (error.code) {
      case ApiErrorCode.NetworkError:
        message = 'Please check your internet connection.';
        icon = <CloudOffIcon style={{ fontSize: '5rem' }} />;
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

      case ApiErrorCode.GatewayTimeout:
        message = 'Our server did not have any response.';
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
      <ButtonsContainer>
        <Button color="primary" variant="contained" onClick={resetErrorBoundary}>
          Try again
        </Button>
      </ButtonsContainer>
    </div>
  );
};

export default ErrorFallback;
