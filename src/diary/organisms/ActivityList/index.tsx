import React from 'react';
import { format } from 'date-fns';
import { styled } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import { useRecoilState, useRecoilValue } from 'recoil';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import WarningIcon from '@material-ui/icons/Warning';
import Button from '@material-ui/core/Button';
import { Pagination } from '../../../common/molecules/Pagination';
import { activityFilterState, filteredActivitiesState } from '../../states';
import { LoadingContent } from '../../../common/atoms/LoadingContent';
import { ActionButtons } from '../../../common/atoms/ActionButtons';
import { ActivityItem } from '../../molecules/ActivityItem';
import { Activity } from '../../types';

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

const ErrorFallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert">
      <Typography align="center" paragraph>
        <WarningIcon style={{ fontSize: '5rem' }} />
      </Typography>
      <Typography align="center" paragraph component="div">
        Something went wrong:
        <pre>{error.message}</pre>
      </Typography>
      <ActionButtons>
        <Button color="primary" variant="contained" onClick={resetErrorBoundary}>
          Try again
        </Button>
      </ActionButtons>
    </div>
  );
};

const ActivityList: React.VFC = () => {
  const [filter, setFilter] = useRecoilState(activityFilterState);
  const retry = React.useCallback(() => setFilter((data) => ({ ...data })), [setFilter]);
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={retry} resetKeys={[filter]}>
      <React.Suspense fallback={<LoadingContent />}>
        <LoadableActivityList />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default ActivityList;
