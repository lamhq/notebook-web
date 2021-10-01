import React from 'react';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { GOOGLE_CLIENT_ID } from '../../../config';

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
    <GoogleLogin
      clientId={GOOGLE_CLIENT_ID}
      onSuccess={handleSuccess}
      onFailure={handleFailure}
      render={(renderProps) => (
        <button type="button" disabled={renderProps.disabled} onClick={renderProps.onClick}>
          Login with Google
        </button>
      )}
    />
  );
};

export default GoogleLoginForm;
