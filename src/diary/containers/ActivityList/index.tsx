import React, { useCallback } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import Typography from '@mui/material/Typography';
import { Activity } from '../../types';
import { activityFilterState } from '../../states';
import Pagination from '../../../common/atoms/Pagination';
import LoadingFallback from '../../../common/atoms/LoadingFallback';
import ActivityListView from '../../organisms/ActivityList';
import { useApi } from '../../../api';
import { useAsyncData } from '../../../common/hooks';
import { ApiErrorBoundary } from '../../../error';

function useActivityList(): [Activity[], number] | undefined {
  const api = useApi();
  const filter = useRecoilValue(activityFilterState);
  const loadActivities = useCallback(() => api.searchActivities(filter), [filter, api]);
  const result = useAsyncData(loadActivities);
  return result;
}

const LoadableActivityList: React.VFC = () => {
  const activityData = useActivityList();
  const [filter, setFilter] = useRecoilState(activityFilterState);
  const handlePageChange = React.useCallback(
    (_, newPage: number) => {
      setFilter((curFilter) => ({
        ...curFilter,
        page: newPage,
      }));
    },
    [setFilter],
  );

  if (activityData === undefined) return <LoadingFallback />;
  const [activities, pageCount] = activityData;

  return activities.length ? (
    <>
      <ActivityListView models={activities} />
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

const ActivityList: React.VFC = () => {
  return (
    <ApiErrorBoundary>
      <LoadableActivityList />
    </ApiErrorBoundary>
  );
};

export default ActivityList;
