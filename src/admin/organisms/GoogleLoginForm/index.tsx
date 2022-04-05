import React from 'react';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { GOOGLE_CLIENT_ID } from '../../../config';
import ButtonsContainer from '../../../common/atoms/ButtonsContainer';

export interface GoogleLoginFormProps {
  onLoginSuccess: (token: string) => void;
}

const GoogleLoginForm: React.VFC<GoogleLoginFormProps> = ({ onLoginSuccess }) => {
  const handleSuccess = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if ('accessToken' in response) {
      onLoginSuccess(response.accessToken);
    }
  };

  const handleFailure = (error: Error) => {
    throw error;
  };

  return (
    <ButtonsContainer>
      <GoogleLogin
        clientId={GOOGLE_CLIENT_ID}
        onSuccess={handleSuccess}
        onFailure={handleFailure}
        render={(renderProps) => (
          <Button
            disabled={renderProps.disabled}
            onClick={renderProps.onClick}
            color="primary"
            variant="contained"
            startIcon={<GoogleIcon />}
          >
            Sign in with Google
          </Button>
        )}
      />
    </ButtonsContainer>
  );
};

export default GoogleLoginForm;
