import React from 'react';
import { format } from 'date-fns';
import { styled } from '@material-ui/core/styles';
import { useRecoilState, useRecoilValue } from 'recoil';

import { ErrorBoundary } from 'react-error-boundary';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { Pagination } from '../../../common/molecules/Pagination';
import { activityFilterState, filteredActivitiesState } from '../../states';
import { LoadingFallback } from '../../../common/atoms/LoadingFallback';
import { ActivityItem } from '../../molecules/ActivityItem';
import { Activity } from '../../types';
import { ApiErrorCode, ErrorHandler, useErrorHandler, ApiError } from '../../../error';
import ErrorFallback from '../../../error/organisms/ErrorFallback';

const Panel = styled('div')(({ theme }) => ({
  backgroundColor: '#fff',
  padding: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

const ItemDivider = styled(Divider)(({ theme }) => ({
  height: '1px',
  margin: `${theme.spacing(1)}px 0`,
}));

export interface ActivityListViewProps {
  models: Activity[];
}

interface ActivityGroup {
  [key: string]: Activity[];
}

export const ActivityListView: React.VFC<ActivityListViewProps> = ({ models }) => {
  const dates = models.reduce((current, item) => {
    const date = format(new Date(item.time), 'EEE, d LLL, yyyy');
    const res = { ...current };
    if (!res[date]) res[date] = [];
    res[date].push(item);
    return res;
  }, {} as ActivityGroup);

  return (
    <>
      {Object.entries(dates).map(([date, activities]) => (
        <Panel key={date}>
          <Typography component="h4" variant="h4" gutterBottom>
            {date}
          </Typography>
          {activities.map((model, index) => (
            <React.Fragment key={model.id}>
              {index > 0 && <ItemDivider variant="middle" />}
              <ActivityItem model={model} />
            </React.Fragment>
          ))}
        </Panel>
      ))}
    </>
  );
};

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
  const [filter, setFilter] = useRecoilState(activityFilterState);
  const retry = React.useCallback(() => setFilter((data) => ({ ...data })), [setFilter]);
  const defaultHandler = useErrorHandler();
  const handleError: ErrorHandler = React.useCallback(
    async (error) => {
      if (error instanceof ApiError && error.statusCode === ApiErrorCode.Unauthenticated) {
        defaultHandler(error);
      }
    },
    [defaultHandler],
  );
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={retry}
      resetKeys={[filter]}
      onError={handleError}
    >
      <React.Suspense fallback={<LoadingFallback />}>
        <LoadableActivityList />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default ActivityList;
