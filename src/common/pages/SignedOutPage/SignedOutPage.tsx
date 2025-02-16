import Button from '@mui/material/Button';
import { useAuth } from 'react-oidc-context';
import { Link, Navigate } from 'react-router';
import { HOME_ROUTE } from '../../../routes';

export default function SignedOutPage() {
  const auth = useAuth();
  const signIn = () => void auth.signinRedirect();
  if (auth.isAuthenticated) {
    return <Navigate to={HOME_ROUTE} />;
  }

  return (
    <p>
      You've been signed out. Please <Button onClick={signIn}>sign in</Button> to
      continue or go to <Link to={HOME_ROUTE}>home page</Link>.
    </p>
  );
}
