import BlockIcon from '@mui/icons-material/Block';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import SearchIcon from '@mui/icons-material/Search';
import WarningIcon from '@mui/icons-material/Warning';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { AxiosError } from 'axios';
import type { FallbackProps } from 'react-error-boundary';
import { Navigate } from 'react-router';
import ButtonsContainer from '../../atoms/ButtonsContainer';

export default function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const iconStyle = { fontSize: '5rem' };
  let message = 'An error occurred in the app.';
  let icon = <WarningIcon style={iconStyle} />;

  if (error instanceof AxiosError) {
    // network error
    if (error.request && !error.response) {
      error.status = 0;
    }

    switch (error.status) {
      case 0:
        message = 'Please check your network connection.';
        icon = <CloudOffIcon style={iconStyle} />;
        break;

      case 401:
        return <Navigate to="/login" />;

      case 404:
        message = 'Resource not found.';
        icon = <SearchIcon style={iconStyle} />;
        break;

      case 403:
        message = 'Your cannot access this section right now.';
        icon = <BlockIcon style={iconStyle} />;
        break;

      case 500:
        message = 'Server has an error. Please try again later';
        break;

      default:
        break;
    }
  }

  return (
    <Stack role="alert" spacing={1}>
      <Typography align="center" variant="body1">
        {icon}
      </Typography>
      <Typography align="center" variant="body1">
        {message}
      </Typography>
      <ButtonsContainer>
        <Button color="primary" variant="contained" onClick={resetErrorBoundary}>
          Try again
        </Button>
      </ButtonsContainer>
    </Stack>
  );
}
