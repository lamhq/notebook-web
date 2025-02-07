import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import { Link } from 'react-router';
import ButtonsContainer from '../../atoms/ButtonsContainer';
import Typography from '../../atoms/Typography';
import BlankLayout from '../../templates/BlankLayout/BlankLayout';

export default function NotFoundPage() {
  return (
    <BlankLayout title="Not Found">
      <Typography align="center">
        <SearchIcon style={{ fontSize: '5rem' }} />
      </Typography>
      <Typography align="center">This page does not exist.</Typography>
      <ButtonsContainer>
        <Button color="primary" variant="contained" component={Link} to="/">
          Return
        </Button>
      </ButtonsContainer>
    </BlankLayout>
  );
}
