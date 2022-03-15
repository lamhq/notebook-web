import React from 'react';
import Typography from '@material-ui/core/Typography';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';
import SubLayout from '../../../common/templates/SubLayout';
import ButtonsContainer from '../../../common/atoms/ButtonsContainer';

const ResetPwdSuccessPage: React.VFC = () => {
  return (
    <SubLayout title="Password Changed">
      <Typography align="center" paragraph>
        <CheckCircleOutlineIcon style={{ fontSize: '5rem' }} />
      </Typography>
      <Typography align="center" paragraph>
        Your password has been updated. Click the button below to continue.
      </Typography>
      <ButtonsContainer>
        <Button color="primary" variant="contained" component={RouterLink} to="/login">
          Continue
        </Button>
      </ButtonsContainer>
    </SubLayout>
  );
};

export default ResetPwdSuccessPage;
