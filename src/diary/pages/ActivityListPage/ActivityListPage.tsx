import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import ButtonsContainer from '../../../common/atoms/ButtonsContainer';
import MainLayout from '../../../common/templates/MainLayout';
import Revenue from '../../atoms/Revenue';
import ActivityList from '../../organisms/ActivityList';
import SearchDialog from '../../organisms/SearchDialog';

const ToolBar = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(2),
  display: 'flex',
  justifyContent: 'space-between',
}));

export default function ActivityListPage() {
  return (
    <MainLayout title="Activities">
      <ToolBar>
        <ButtonsContainer>
          <IconButton
            color="primary"
            size="small"
            component={RouterLink}
            to="/activities/new"
          >
            <AddCircleIcon />
          </IconButton>
          <SearchDialog />
        </ButtonsContainer>
        <Revenue />
      </ToolBar>
      <ActivityList />
    </MainLayout>
  );
}
