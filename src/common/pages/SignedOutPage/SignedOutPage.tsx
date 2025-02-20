import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useAuth } from 'react-oidc-context';
import { Link, Navigate } from 'react-router';
import { HOME_ROUTE } from '../../../routes';
import Typography from '../../atoms/Typography';

export default function SignedOutPage() {
  const auth = useAuth();
  const signIn = () => void auth.signinRedirect();
  if (auth.isAuthenticated) {
    return <Navigate to={HOME_ROUTE} />;
  }

  return (
    <Container sx={{ py: 2 }}>
      <Typography component="h1" variant="h2">
        You've been signed out
      </Typography>
      <Typography>
        <p>
          To sign in again, choose the <strong>Sign In</strong> button below.
        </p>
        <p>
          Or return to &nbsp;
          <Link to={HOME_ROUTE}>home page</Link>.
        </p>
      </Typography>
      <p>
        <Button onClick={signIn} variant="contained">
          sign in
        </Button>
      </p>
    </Container>
  );
}
