import React from 'react';
import Grid from '@material-ui/core/Grid';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import { Link as RouterLink } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { ActivityList } from '../../organisms/ActivityList';
import { Pagination } from '../../../common/molecules/Pagination';
import { Revenue } from '../../atoms/Revenue';
// import { ActivitySearchDialog } from '../../organisms/ActivitySearchDialog';
import { MainLayout } from '../../../common/templates/MainLayout';
import { Actions } from '../../../common/atoms/Actions';
import { withAuth } from '../../../identity';
import { filteredActivitiesState } from './states';

const LoadableActivityList: React.VFC = () => {
  const filteredActivities = useRecoilValue(filteredActivitiesState);
  return <ActivityList models={filteredActivities} />;
};

const ActivityListPage: React.VFC = () => {
  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  return (
    <MainLayout title="Activities">
      <Grid container justify="space-between" spacing={0}>
        <Actions>
          <IconButton color="primary" size="small" component={RouterLink} to="/activities/new">
            <AddCircleIcon />
          </IconButton>
          {/* <ActivitySearchDialog /> */}
        </Actions>
        <Revenue income={400} outcome={120} />
      </Grid>
      <React.Suspense fallback={<div>Loading...</div>}>
        <LoadableActivityList />
        <Pagination page={page} onChange={handleChange} count={10} />
      </React.Suspense>
    </MainLayout>
  );
};

export default withAuth()(ActivityListPage);
