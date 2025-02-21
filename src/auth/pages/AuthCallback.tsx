import { useAuth } from 'react-oidc-context';
import { Navigate } from 'react-router';
import { HOME_ROUTE } from '../../routes';
import { REDIRECT_ROUTE } from '../constants';

export default function AuthCallbackPage() {
  const auth = useAuth();

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    const route = window.localStorage.getItem(REDIRECT_ROUTE);
    return <Navigate to={route ?? HOME_ROUTE} />;
  }

  // TODO: show a loading spinner with below text `Signing you in`
  return <div>Signing you in...</div>;
}
