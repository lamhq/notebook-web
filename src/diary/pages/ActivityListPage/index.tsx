import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import ActivityList from '../../containers/ActivityList';
import Revenue from '../../containers/Revenue';
import ActivitySearchDialog from '../../containers/ActivitySearchDialog';
import MainLayout from '../../../common/templates/MainLayout';
import ButtonsContainer from '../../../common/atoms/ButtonsContainer';

const ToolBar = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(2),
  display: 'flex',
  justifyContent: 'space-between',
}));

const ActivityListPage: React.VFC = () => {
  return (
    <MainLayout title="Activities">
      <ToolBar>
        <ButtonsContainer>
          <IconButton color="primary" size="small" component={RouterLink} to="/activities/new">
            <AddCircleIcon />
          </IconButton>
          <ActivitySearchDialog />
        </ButtonsContainer>
        <Revenue />
      </ToolBar>
      <ActivityList />
    </MainLayout>
  );
};

export default ActivityListPage;
