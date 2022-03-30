import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import ButtonsContainer from '../../atoms/ButtonsContainer';
import BlankLayout from '../../templates/BlankLayout';

const NotFoundPage: React.VFC = () => {
  return (
    <BlankLayout title="Not Found">
      <Typography align="center" paragraph>
        <SearchIcon style={{ fontSize: '5rem' }} />
      </Typography>
      <Typography align="center" paragraph>
        This page does not exists
      </Typography>
      <ButtonsContainer>
        <Button color="primary" variant="contained" component={RouterLink} to="/">
          Return
        </Button>
      </ButtonsContainer>
    </BlankLayout>
  );
};

export default NotFoundPage;
