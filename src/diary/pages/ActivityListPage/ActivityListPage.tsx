import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import ButtonsContainer from '../../../common/atoms/ButtonsContainer';
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
      <ToolBar>
        <ButtonsContainer>
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
        </ButtonsContainer>

        {/* Monthly Spend */}
        <Revenue />
      </ToolBar>

      <ActivityList />
    </>
  );
}
