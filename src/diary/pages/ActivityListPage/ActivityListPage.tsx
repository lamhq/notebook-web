import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import Actions from '../../../common/atoms/Actions';
import { Title } from '../../../common/templates/MainLayout';
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
    <>
      <Title>Activities</Title>
      <ToolBar>
        <Actions>
          {/* Add Activity */}
          <IconButton
            color="primary"
            size="small"
            component={RouterLink}
            to="/activities/new"
          >
            <AddCircleIcon />
          </IconButton>
          {/* Search Activity */}
          <SearchDialog />
        </Actions>

        {/* Monthly Spend */}
        <Revenue />
      </ToolBar>

      <ActivityList />
    </>
  );
}
