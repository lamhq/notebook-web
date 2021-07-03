import React from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import { Link as RouterLink } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/core/styles';
import { SubmitHandler } from 'react-hook-form';
import { ActivityList } from '../../organisms/ActivityList';
import { Pagination } from '../../../common/molecules/Pagination';
import { Revenue } from '../../atoms/Revenue';
import { ActivitySearchDialog } from '../../organisms/ActivitySearchDialog';
import { MainLayout } from '../../../common/templates/MainLayout';
import { ActionButtons } from '../../../common/atoms/ActionButtons';
import { withAuth } from '../../../identity';
import { activityFilterState, filteredActivitiesState } from './states';
import { LoadingContent } from '../../../common/atoms/LoadingContent';
import { ActivityFilterModel } from '../../types';

const ToolBar = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(2),
  display: 'flex',
  justifyContent: 'space-between',
}));

const LoadableActivityList: React.VFC = () => {
  const [activities, pageCount] = useRecoilValue(filteredActivitiesState);
  const [filter, setFilter] = useRecoilState(activityFilterState);
  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setFilter((curFilter) => ({
      ...curFilter,
      page: newPage,
    }));
  };
  return activities.length ? (
    <>
      <ActivityList models={activities} />
      {pageCount > 1 && (
        <Pagination page={filter.page} onChange={handlePageChange} count={pageCount} />
      )}
    </>
  ) : (
    <Typography align="center" variant="body1">
      There&apos;s no items to display.
    </Typography>
  );
};

const ActivityListPage: React.VFC = () => {
  const [filter, setFilter] = useRecoilState(activityFilterState);
  const handleSearch: SubmitHandler<ActivityFilterModel> = React.useCallback(
    (data) => {
      setFilter(data);
    },
    [setFilter],
  );
  return (
    <MainLayout title="Activities">
      <ToolBar>
        <ActionButtons>
          <IconButton color="primary" size="small" component={RouterLink} to="/activities/new">
            <AddCircleIcon />
          </IconButton>
          <ActivitySearchDialog values={filter} onSubmit={handleSearch} />
        </ActionButtons>
        <Revenue income={400} outcome={120} />
      </ToolBar>
      <React.Suspense fallback={<LoadingContent />}>
        <LoadableActivityList />
      </React.Suspense>
    </MainLayout>
  );
};

export default withAuth()(ActivityListPage);
