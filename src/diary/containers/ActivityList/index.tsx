import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { ErrorBoundary } from 'react-error-boundary';
import Typography from '@material-ui/core/Typography';
import { activityFilterState, filteredActivitiesState } from '../../states';
import { ApiErrorCode, ErrorHandler, useErrorHandler, ApiError } from '../../../error';
import Pagination from '../../../common/molecules/Pagination';
import LoadingFallback from '../../../common/atoms/LoadingFallback';
import ErrorFallback from '../../../error/organisms/ErrorFallback';
import ActivityListView from '../../organisms/ActivityList';
import { useRefreshActivityList } from '../../hooks';

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
  const activityFilter = useRecoilValue(activityFilterState);
  const refreshActivityList = useRefreshActivityList();
  const defaultHandler = useErrorHandler();
  const handleError: ErrorHandler = React.useCallback(
    async (error) => {
      if (error instanceof ApiError && error.statusCode === ApiErrorCode.Unauthenticated) {
        defaultHandler(error);
      }
    },
    [defaultHandler],
  );

  // invalidate activity list when component is unmounted
  React.useEffect(() => refreshActivityList, [refreshActivityList]);

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={refreshActivityList}
      resetKeys={[activityFilter]}
      onError={handleError}
    >
      <React.Suspense fallback={<LoadingFallback />}>
        <LoadableActivityList />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default ActivityList;
