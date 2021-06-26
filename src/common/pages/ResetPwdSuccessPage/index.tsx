import React from 'react';
import Typography from '@material-ui/core/Typography';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Button from '@material-ui/core/Button';
import { SubLayout } from '../../templates/SubLayout';
import { Actions } from '../../atoms/Actions';

const ResetPwdSuccessPage: React.VFC = () => {
  return (
    <SubLayout title="Password Changed">
      <Typography align="center" paragraph>
        <CheckCircleOutlineIcon style={{ fontSize: '5rem' }} />
      </Typography>
      <Typography align="center" paragraph>
        Your password has been updated. Click the button below to continue.
      </Typography>
      <Actions>
        <Button color="primary" variant="contained">
          Continue
        </Button>
      </Actions>
    </SubLayout>
  );
};

export default ResetPwdSuccessPage;
