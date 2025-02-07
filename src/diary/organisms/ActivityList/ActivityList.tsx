import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { useAtom } from 'jotai';
import { Fragment, Suspense, useCallback } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import type { PaginationProps } from '../../../common/atoms/Pagination';
import Pagination from '../../../common/atoms/Pagination';
import Typography from '../../../common/atoms/Typography';
import ErrorFallback from '../../../common/organism/ErrorFallback';
import LoadingFallback from '../../../common/organism/LoadingFallback';
import { formatDate } from '../../../common/utils';
import { activityFilterAtom } from '../../atoms';
import { useGetActivitiesQuery } from '../../hooks';
import ActivityItem from '../../molecules/ActivityItem';
import type { Activity } from '../../types';

export type ActivityListViewProps = {
  activities: Activity[];
};

export function ActivityListView({ activities }: ActivityListViewProps) {
  const dates = activities.reduce<Record<string, Activity[]>>((current, item) => {
    const date = formatDate(item.time);
    const res = current;
    res[date] ??= [];
    res[date].push(item);
    return res;
  }, {});

  return (
    <>
      {Object.entries(dates).map(([date, items]) => (
        <Box
          key={date}
          sx={{
            padding: 1,
            marginBottom: 2,
            backgroundColor: 'background.paper',
          }}
        >
          <Typography component="h4" variant="h4" gutterBottom>
            {date}
          </Typography>
          {items.map((item, index) => (
            <Fragment key={item.id}>
              {index > 0 && (
                <Divider
                  variant="middle"
                  sx={{
                    height: '1px',
                    my: 1,
                    mx: 0,
                    borderBottomWidth: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.12)',
                  }}
                />
              )}
              <ActivityItem activity={item} />
            </Fragment>
          ))}
        </Box>
      ))}
    </>
  );
}

function FetchActivitySelect() {
  const [filter, setFilter] = useAtom(activityFilterAtom);
  const [activities, totalItemCount] = useGetActivitiesQuery(filter);
  const pageCount = Math.ceil(totalItemCount / filter.pageSize);
  const handlePageChange = useCallback<NonNullable<PaginationProps['onChange']>>(
    (_, newPage: number) => {
      setFilter((curFilter) => ({
        ...curFilter,
        page: newPage,
      }));
    },
    [setFilter],
  );

  return activities.length ? (
    <>
      <ActivityListView activities={activities} />
      {pageCount > 1 && (
        <Pagination
          page={filter.page}
          onChange={handlePageChange}
          count={pageCount}
        />
      )}
    </>
  ) : (
    <Typography align="center" variant="body1">
      There&apos;s no items to display.
    </Typography>
  );
}

export default function ActivityList() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<LoadingFallback />}>
        <FetchActivitySelect />
      </Suspense>
    </ErrorBoundary>
  );
}
